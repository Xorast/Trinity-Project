import os
from flask import Flask, flash, request, redirect, url_for, render_template, send_file
from werkzeug.utils import secure_filename
import csv        


app = Flask(__name__)
           


# CUSTOM FUNCTIONS -------------------------------------------------------------
def relative_path(rel_file_path):
    return os.path.join(os.path.dirname(__file__),rel_file_path)
    
# SETTINGS ---------------------------------------------------------------------

upload_folder           = relative_path('assets/data/input/')
allowed_extensions      = set(['csv'])
input_file_abs_path     = relative_path('assets/data/input/input_data_example_a.csv')
output_file_abs_path    = relative_path('assets/data/output/test.csv')


# input_fields_name     = ['row','date','q','rain','temp','ETP_dint','peff']
output_fields_name      = ['row','date','q','rain','temp','ETP_dint','peff','baseflow_1','baseflow_2','baseflow_3']

a       = 0.75
BFI     = 0.25

# UPLOADING THE INPUT FILE -----------------------------------------------------
# code coming from the flask documentation : 
# http://flask.pocoo.org/docs/1.0/patterns/fileuploads/

app.config['upload_folder']         = upload_folder
app.config['max_content_lenght']    = 2 * 1024 * 1024 #2 megabytes

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_extensions
    
@app.route('/', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        # if user does not select file, browser also
        # submit an empty part without filename
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['upload_folder'], filename))
            return redirect('/')
    return render_template("index.html")

# SENDING THE OUTPUT FILE ------------------------------------------------------
# Need to create a feedback
@app.route('/getCSVOutputFile')
def send_output_csv():
    return send_file(output_file_abs_path,
                     mimetype='text/csv',
                     attachment_filename='test.csv',
                     as_attachment=True)
                     
# BASEFLOW CALCULATION ---------------------------------------------------------
# MODEL 1 - Eckhardt filter ---------------------------------------------------- 

def baseflow_model_1(q, previous_q, a, BFI, dc_q):
    
    q           = float(q)
    previous_q  = float(previous_q)
    
    return str(round(((1 - BFI)*a*previous_q  +  (1 - a)*BFI*q) / (1 - a*BFI), dc_q))
    
# DATA FORMAT ------------------------------------------------------------------

def data_cleaning(value_as_string, dc_):
    if '.' in value_as_string :
        value_as_string = value_as_string.split('.',1)[0] + '.' + value_as_string.split('.',1)[1][:dc_]
    return value_as_string

# MAIN FUNCTION : MAKING OF THE OUTPUT FILE ------------------------------------

with open(input_file_abs_path) as input_csvfile, open(output_file_abs_path, 'w+', newline='') as output_csvfile :
    
    reader = csv.DictReader(input_csvfile, delimiter=',')
    writer = csv.DictWriter(output_csvfile, fieldnames=output_fields_name)
    
    writer.writeheader()
    
    # number of decimals
    dc_temp      = 1 
    dc_q         = 4 
    dc_rain      = 1 
    dc_peff      = 4 
    dc_ETP_dint  = 1 
    
    # initialization required for the first "baseflow_1" value
    first_row = next(reader)
    writer.writerow({
        'row'       :   first_row['row'],
        'date'      :   first_row['date'],
        'q'         :   data_cleaning(first_row['q'],dc_q),
        'rain'      :   data_cleaning(first_row['rain'],dc_rain),
        'temp'      :   data_cleaning(first_row['temp'],dc_temp),
        'ETP_dint'  :   data_cleaning(first_row['ETP_dint'],dc_ETP_dint),
        'peff'      :   data_cleaning(first_row['peff'],dc_peff),
        # baseflow_1 taken equal to the first "q"
        'baseflow_1':   data_cleaning(first_row['q'],dc_q),
        # 'baseflow_2':   '',
        # 'baseflow_3':   '',    
    })
    previous_row_q_value = first_row['q']
    
    for row_line in reader:
        writer.writerow({
            'row'       :   row_line['row'],
            'date'      :   row_line['date'],
            'q'         :   data_cleaning(row_line['q'],dc_q),
            'rain'      :   data_cleaning(row_line['rain'],dc_rain),
            'temp'      :   data_cleaning(row_line['temp'],dc_temp),
            'ETP_dint'  :   data_cleaning(row_line['ETP_dint'],dc_ETP_dint),
            'peff'      :   data_cleaning(row_line['peff'],dc_peff),
            'baseflow_1':   baseflow_model_1(row_line['q'], previous_row_q_value, a, BFI, dc_q),
            # 'baseflow_2':   '',
            # 'baseflow_3':   '',
        })
        previous_row_q_value = row_line['q']
        
# ------------------------------------------------------------------------------

if __name__ == '__main__':
    app.run(host=os.getenv('IP', '0.0.0.0'), port=int(os.getenv('PORT', 8080)))

# ------------------------------------------------------------------------------
# ------------------------------------------------------------------------------
# ------------------------------------------------------------------------------
# ------------------------------------------------------------------------------
# ------------------------------------------------------------------------------

