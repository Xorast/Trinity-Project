import os
import csv                                                                      

# CUSTOM FUNCTIONS -------------------------------------------------------------
def relative_path(rel_file_path):
    return os.path.join(os.path.dirname(__file__),rel_file_path)
    
# SETTINGS ---------------------------------------------------------------------

input_file_abs_path     = relative_path('../data/input/input_data_example_a.csv')
output_file_abs_path    = relative_path('../data/output/test.csv')

input_fields_name       = ['row','date','q','rain','temp','ETP_dint','peff']
output_fields_name      = ['row','date','q','rain','temp','ETP_dint','peff','baseflow_1','baseflow_2','baseflow_3']

# BASEFLOW CALCULATION ---------------------------------------------------------
# + MODEL 1 -------------------------------------------------------------------- 

def baseflow_model_1(q):
    return str(float(q)*2)

# + MODEL 2 -------------------------------------------------------------------- 

# READING DATA -----------------------------------------------------------------

with open(input_file_abs_path) as input_csvfile, open(output_file_abs_path, 'w+', newline='') as output_csvfile :
    
    reader = csv.DictReader(input_csvfile, delimiter=',')
    writer = csv.DictWriter(output_csvfile, fieldnames=output_fields_name)
    writer.writeheader()
    
    for row_line in reader:
        writer.writerow({
            'row'       :   row_line['row'],
            'date'      :   row_line['date'],
            'q'         :   row_line['q'],
            'rain'      :   row_line['rain'],
            'temp'      :   row_line['temp'],
            'ETP_dint'  :   row_line['ETP_dint'],
            'peff'      :   row_line['peff'],
            'baseflow_1':   baseflow_model_1(row_line['q']),
            'baseflow_2':   '',
            'baseflow_3':   '',
        })
# ------------------------------------------------------------------------------
# ------------------------------------------------------------------------------
# ------------------------------------------------------------------------------
# ------------------------------------------------------------------------------
# ------------------------------------------------------------------------------
# ------------------------------------------------------------------------------
# ------------------------------------------------------------------------------



