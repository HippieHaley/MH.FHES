from flask import Flask, request, jsonify
import pandas as pd
import re  # Import regex module

app = Flask(__name__)

@app.route('/process', methods=['POST'])
def process_file():
    # Check if a file is provided
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']

    # Read the Excel file into a DataFrame
    try:
        df = pd.read_excel(file)
    except Exception as e:
        return jsonify({'error': f'Failed to read file: {str(e)}'}), 400

    # Define the regex pattern for parsing
    regex = re.compile(
        r'(?:Service Line#\s*(\d+)|(\d{6}-CL-\d{5})\s+'  # Service Line or Claim Number
        r'(\d{2}[/-]\d{2}[/-]\d{4})\s+'                  # Service date
        r'([\w\s-]+)\s+'                                  # Procedure code and description
        r'(\d+)\s+'                                       # Units
        r'\$?([\d,]*\.?\d*)\s+'                           # Unit Rate
        r'\$?([\d,]*\.?\d*)\s+'                           # Total Charge
        r'\$?([\d,]*\.?\d*)\s+'                           # Patient Charge
        r'\$?([\d,]*\.?\d*)\s+'                           # Total Paid
        r'\$?([\d,]*\.?\d*)\s+'                           # Insurance Paid
        r'\$?([\d,]*\.?\d*)\s+'                           # Patient Paid
        r'\$?([\d,]*\.?\d*)\s+'                           # Total Adjustment
        r'\$?([\d,]*\.?\d*)'                              # Balance Owed
    )

    # Extract matching rows
    parsed_data = []
    for index, row in df.iterrows():
        match = regex.match(str(row[0]))  # Assuming the data is in the first column
        if match:
            service_line, claim_number, service_date, procedure_code, units, unit_rate, total_charge, patient_charge, total_paid, insurance_paid, patient_paid, adjustment, balance_owed = match.groups()

            # Ensure that unit rate and total charge are assigned correctly for service lines
            if service_line and not unit_rate:
                unit_rate = total_charge
                total_charge = patient_charge

            # Ignore procedure code for claim rows
            if claim_number:
                procedure_code = None

            parsed_data.append({
                'Claim Number': claim_number or f"Service Line# {service_line}",
                'Service Date': service_date,
                'Procedure (and Codes)': procedure_code,
                'Units': int(units),
                'Unit Rate': float(unit_rate.replace(',', '')) if unit_rate else 0.0,
                'Total Charge': float(total_charge.replace(',', '')) if total_charge else 0.0,
                'Patient Charge': float(patient_charge.replace(',', '')) if patient_charge else 0.0,
                'Total Paid': float(total_paid.replace(',', '')) if total_paid else 0.0,
                'Insurance Paid': float(insurance_paid.replace(',', '')) if insurance_paid else 0.0,
                'Patient Paid': float(patient_paid.replace(',', '')) if patient_paid else 0.0,
                'Total Adjustment': float(adjustment.replace(',', '')) if adjustment else 0.0,
                'Balance Owed': float(balance_owed.replace(',', '')) if balance_owed else 0.0
            })

    # Return the parsed data as JSON
    return jsonify({
        'client_name': 'Sample Client',  # Replace with actual client name logic
        'clinic_name': 'Sample Clinic',  # Replace with actual clinic name logic
        'unapplied_balance': 0.0,        # Replace with actual unapplied balance logic
        'totals': 0.0,                    # Replace with actual totals logic
        'rows': parsed_data
    })

if __name__ == '__main__':
    app.run(debug=True)