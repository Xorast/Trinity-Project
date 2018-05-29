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
    
# MAIN FUNCTION : MAKING OF THE OUTPUT FILE ------------------------------------

# with open(input_file_abs_path) as input_csvfile, open(output_file_abs_path, 'w+', newline='') as output_csvfile :
    
#     reader = csv.DictReader(input_csvfile, delimiter=',')
#     writer = csv.DictWriter(output_csvfile, fieldnames=output_fields_name)
    
#     writer.writeheader()
#     for row_line in reader:
#         writer.writerow({
#             'row'       :   row_line['row'],
#             'date'      :   row_line['date'],
#             'q'         :   row_line['q'],
#             'rain'      :   row_line['rain'],
#             'temp'      :   row_line['temp'],
#             'ETP_dint'  :   row_line['ETP_dint'],
#             'peff'      :   row_line['peff'],
#             'baseflow_1':   baseflow_model_1(row_line['q'], a, bfi),
#             'baseflow_2':   '',
#             'baseflow_3':   '',
#         })
# ------------------------------------------------------------------------------

# FUNCTION TO BE TRANSLATED IN PYTHON
#     function (discharge, a, BFI) 
# {
#     bf <- rep(discharge[1], length(discharge))
#     for (i in 2:length(discharge)) {
#         bf[i] <- (((1 - BFI) * a * bf[i - 1]) + ((1 - a) * BFI * 
#             discharge[i]))/(1 - a * BFI)
#         if (bf[i] > discharge[i]) 
#             bf[i] <- discharge[i]
#     }
#     return(bf)
# }

#  -----------------------------------------------------------------------------