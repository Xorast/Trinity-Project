# DOCUMENTATION

# http://www.pythonforbeginners.com/csv/using-the-csv-module-in-python
# https://docs.python.org/3/library/csv.html

# READING DATA -----------------------------------------------------------------

# with open(input_file_abs_path) as input_csvfile:
    
#     reader = csv.DictReader(input_csvfile, delimiter=',')
#     for row in reader:
#         print(row['date'], row['rain'])

# WRITING DATA -----------------------------------------------------------------

# with open(output_file_abs_path, 'w+', newline='') as output_csvfile:
    
#     writer = csv.DictWriter(output_csvfile, fieldnames=output_fields_name)
#     writer.writeheader()
#     writer.writerow({
#         'row_nb'    :'...',
#         'date'      :'...',
#         'q'         :'...',
#         'rain'      :'...',
#         'temp'      :'...',
#         'ETP_dint'  :'...',
#         'peff'      :'...',
#         'baseflow_1':'...',
#         'baseflow_2':'...',
#         'baseflow_3':'...',
#     })
    