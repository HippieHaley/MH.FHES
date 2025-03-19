import pandas as pd
import re
import PySimpleGUI as sg

# Create file upload window using PySimpleGUI
def upload_file():
    layout = [[sg.Text("Select an Excel file:")],
              [sg.Input(), sg.FileBrowse(file_types=(('Excel Files', '*.xlsx'),))],
              [sg.Button("Submit"), sg.Button("Cancel")]]

    window = sg.Window("Upload Excel File", layout)
    file_path = None

    while True:
        event, values = window.read()
        if event == "Submit":
            file_path = values[0]
            break
        if event == sg.WINDOW_CLOSED or event == "Cancel":
            break

    window.close()
    return file_path

# Upload file
file_path = upload_file()
if not file_path:
    print("No file selected. Exiting.")
    exit()

# Load the Excel file
data = pd.ExcelFile(file_path)

# Load the data from the 'Invoice' sheet
df = data.parse('Invoice')

# Reset dataframe index
df.reset_index(drop=True, inplace=True)

# Find where the table starts
table_start_idx = df[df.iloc[:, 0].str.contains('Claim Number', na=False)].index[0]

# Extract table data
raw_data = df.iloc[table_start_idx + 1:, :].dropna().values.flatten().tolist()

# Keep only rows starting with "Service Line#" or valid claim numbers
filtered_data = [row for row in raw_data if row.startswith('Service Line#') or row.startswith('105692-CL-') or row.startswith('A')]

# Split rows using regex for consistent spacing
split_rows = [re.split(r'\s+', row) for row in filtered_data]

# Clean up any extra characters or spaces
split_rows = [[cell.strip().replace('$', '').replace(',', '') for cell in row] for row in split_rows]

# Fix Claim Number (Handle Multiple Formats)
for row in split_rows:
    claim_match = re.match(r'^(105692-CL-\d+)(\s*Service Line#\s*(\d+))?', row[0])
    alt_claim_match = re.match(r'^(A\d+)(\s*Service Line#\s*(\d+))?', row[0])

    if claim_match:
        claim_number = claim_match.group(1)
        line_number = claim_match.group(3)
        if line_number:
            row[0] = f"{claim_number}-Line-{line_number}"
        else:
            row[0] = claim_number

    elif alt_claim_match:
        claim_number = alt_claim_match.group(1)
        line_number = alt_claim_match.group(3)
        if line_number:
            row[0] = f"{claim_number}-Line-{line_number}"
        else:
            row[0] = claim_number

# Fix Service Date based on known field position
for row in split_rows:
    if len(row) >= 14:
        if not re.match(r'\d{2}/\d{2}/\d{4}', row[1]):
            date_match = next((value for value in row if re.match(r'\d{2}/\d{2}/\d{4}', value)), None)
            row[1] = date_match if date_match else ''

# Fix Procedure Code and Description
for row in split_rows:
    procedure_match = re.match(r'(\d{5})\s*(.*)', row[2])
    if procedure_match:
        cpt_code = procedure_match.group(1)
        description = procedure_match.group(2) if procedure_match.group(2) else 'Unknown Procedure'
        row[2] = f"{cpt_code} {description}"

# Fix Units
for row in split_rows:
    try:
        row[3] = int(row[3]) if row[3].isdigit() else 0
    except:
        row[3] = 0

# Fix Unit Rate Formatting
for row in split_rows:
    try:
        if len(row[4]) <= 2:
            row[4] = f"{int(row[4])}" # Keep as number
        else:
            row[4] = f"${float(row[4]):,.2f}"
    except:
        row[4] = "0"

# Format currency fields correctly
currency_fields = [5, 6, 7, 8, 9, 10, 11, 12, 13]
for row in split_rows:
    for idx in currency_fields:
        try:
            value = float(row[idx])
            if value < 0:
                row[idx] = f"(${abs(value):,.2f})"
            else:
                row[idx] = f"${value:,.2f}"
        except (ValueError, IndexError):
            row[idx] = "$0.00"

# Fix Unapplied Balance to display N/A if empty
for row in split_rows:
    if row[12] in ['', '0', '$0.00']:
        row[12] = 'N/A'

# Ensure row has exactly 14 fields
for row in split_rows:
    if len(row) > 14:
        row = row[:14]
    while len(row) < 14:
        row.append('')

# Convert to DataFrame
cleaned_table = pd.DataFrame(split_rows, columns=[
    'Claim Number', 'Service Date', 'Procedure', 'Units', 'Unit Rate', 'Total Charge',
    'Patient Charge', 'Total Paid', 'Ins. Paid', 'Patient Paid', 'Adjustment', 'Balance',
    'Unapplied Balance', 'Total Due'
])

# Save cleaned table to a new Excel file
output_file = 'cleaned_invoice.xlsx'
cleaned_table.to_excel(output_file, index=False)

print(f"Cleaned data saved to {output_file}")