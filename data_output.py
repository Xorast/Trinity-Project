import os
import csv

from flask import flash, redirect
from calculations import baseflow_model_1
from data_tools import relative_path, data_cleaning

# SETTINGS
a = 0.75
BFI = 0.25


def processing_data(input_full_path, output_full_path, output_fields_name):
    """ Generate the output file. """

    try:     # todo: fix the try/except 
    
        with open(input_full_path) as input_csvfile, open(output_full_path, 'w', newline='') as output_csvfile:
            
            reader = csv.DictReader(input_csvfile, delimiter=',')
            writer = csv.DictWriter(output_csvfile, fieldnames=output_fields_name)
            
            writer.writeheader()
            
            # number of decimals
            dc_temp = 1 
            dc_q = 4 
            dc_rain = 1 
            dc_peff = 4 
            dc_ETP_dint = 1 
            
            # initialization required for the first "baseflow_1" value
            first_row = next(reader)
            writer.writerow({
                'row': first_row['row'],
                'date': first_row['date'],
                'q': data_cleaning(first_row['q'], dc_q),
                'rain': data_cleaning(first_row['rain'], dc_rain),
                'temp': data_cleaning(first_row['temp'], dc_temp),
                'ETP_dint': data_cleaning(first_row['ETP_dint'], dc_ETP_dint),
                'peff': data_cleaning(first_row['peff'], dc_peff),
                'baseflow_1':   data_cleaning(first_row['q'], dc_q),  # baseflow_1 taken equal to the first "q"
                # 'baseflow_2':   '',
            })
            previous_row_bf_1_value = first_row['q']
            
            for row_line in reader:
                writer.writerow({
                    'row': row_line['row'],
                    'date': row_line['date'],
                    'q': data_cleaning(row_line['q'], dc_q),
                    'rain': data_cleaning(row_line['rain'], dc_rain),
                    'temp': data_cleaning(row_line['temp'], dc_temp),
                    'ETP_dint': data_cleaning(row_line['ETP_dint'], dc_ETP_dint),
                    'peff': data_cleaning(row_line['peff'], dc_peff),
                    'baseflow_1': baseflow_model_1(row_line['q'], previous_row_bf_1_value, a, BFI, dc_q),
                    # 'baseflow_2':   '',
                })
                previous_row_bf_1_value = baseflow_model_1(row_line['q'], previous_row_bf_1_value, a, BFI, dc_q)
    
    except Exception as e:
        flash('There has been an error due to the file content. [' + e + '].')
        return redirect("/upload")
