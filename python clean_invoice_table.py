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
filtered_data = [row for row in raw_data if row.startswith('Service Line#') or row.startswith('105692-CL-')]

# Split rows using regex for consistent spacing
split_rows = [re.split(r'\s+', row) for row in filtered_data]

# Clean up any extra characters or spaces
split_rows = [[cell.strip().replace('$', '').replace(',', '') for cell in row] for row in split_rows]

# Fix Service Line# and Line Number extraction
for row in split_rows:
    if row[0].startswith('Service Line#'):
        line_match = re.search(r'Service Line#\s*(\d+)', row[0])
        if line_match:
            line_number = line_match.group(1)
            row[0] = f"Service Line# {line_number}" # Keep line number with Service Line
            row.pop(1) # Remove extra extracted value

# Fix Procedure Code extraction (if it starts with CPU code)
cpu_code_pattern = re.compile(r'\b\d{5,7}\b')
for row in split_rows:
    procedure_match = cpu_code_pattern.search(' '.join(row))
    if procedure_match:
        row[2] = procedure_match.group() + ' ' + row[2]

# Fix Service Date based on known field position
for row in split_rows:
    if len(row) >= 14:
        if not re.match(r'\d{2}/\d{2}/\d{4}', row[1]):
            date_match = next((value for value in row if re.match(r'\d{2}/\d{2}/\d{4}', value)), None)
            row[1] = date_match if date_match else ''

# Fix Unit Rate Formatting (Can be number or currency)
for row in split_rows:
    try:
        if len(row[4]) <= 2:  # If Unit Rate is a single digit or double digit number
            row[4] = f"{int(row[4])}"  # Keep as a number (no $ sign)
        else:
            row[4] = f"${float(row[4]):,.2f}"  # Format as currency if it’s larger
    except (ValueError, IndexError):
        row[4] = "0"

# Format currency fields correctly (like charges, payments)
currency_fields = [5, 6, 7, 8, 9, 10, 11, 12, 13]  # Indexes of currency fields
for row in split_rows:
    for idx in currency_fields:
        try:
            row[idx] = f"${float(row[idx]):,.2f}"
        except (ValueError, IndexError):
            row[idx] = "$0.00"

# Ensure row has exactly 14 fields (shift fields correctly)
for row in split_rows:
    if len(row) > 14:
        row = row[:14]
    while len(row) < 14:
        row.append('')

# Convert to DataFrame
cleaned_table = pd.DataFrame(split_rows, columns=[
    'Claim Number', 'Service Date', 'Procedure', 'Units', 'Unit Rate', 'Total Charge',
    'Patient Charge', 'Total Paid', 'Ins. Paid', 'Patient Paid', 'Total Adj.', 'Total Balance',
    'Unapplied Balance', 'Other Balance'
])

# Save cleaned table to a new Excel file
output_file = 'cleaned_invoice.xlsx'
cleaned_table.to_excel(output_file, index=False)

print(f"Cleaned data saved to {output_file}")
