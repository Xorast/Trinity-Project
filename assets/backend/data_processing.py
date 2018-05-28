import os
from flask import Flask, flash, request, redirect, url_for
from werkzeug.utils import secure_filename
import csv        

app = Flask(__name__)

# CUSTOM FUNCTIONS -------------------------------------------------------------
def relative_path(rel_file_path):
    return os.path.join(os.path.dirname(__file__),rel_file_path)
    
# SETTINGS ---------------------------------------------------------------------

upload_folder           = relative_path('../data/input/')
allowed_extensions      = set(['csv'])
input_file_abs_path     = relative_path('../data/input/input_data_example_a.csv')
output_file_abs_path    = relative_path('../data/output/test.csv')

# input_fields_name     = ['row','date','q','rain','temp','ETP_dint','peff']
output_fields_name      = ['row','date','q','rain','temp','ETP_dint','peff','baseflow_1','baseflow_2','baseflow_3']

a       = 1
bfi     = 1

# UPLOADING THE INPUT FILE -----------------------------------------------------

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
            return redirect('')
    return '''
    <!doctype html>
    <title>Upload new File</title>
    <h1>Upload new File</h1>
    <form method=post enctype=multipart/form-data action='/'>
      <input type=file name=file>
      <input type=submit value=Upload>
    </form>
    '''



# BASEFLOW CALCULATION ---------------------------------------------------------
# + MODEL 1 - Eckhardt filter -------------------------------------------------- 

def baseflow_model_1(q, a, bfi):
    
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
    
    return str(float(q)*2)

# + MODEL 2 -------------------------------------------------------------------- 

# MAIN FUNCTION : MAKING OF THE OUTPUT FILE ------------------------------------

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
            'baseflow_1':   baseflow_model_1(row_line['q'], a, bfi),
            'baseflow_2':   '',
            'baseflow_3':   '',
        })
# ------------------------------------------------------------------------------

if __name__ == '__main__':
    app.run(host=os.getenv('IP', '0.0.0.0'), port=int(os.getenv('PORT', 8080)))

# ------------------------------------------------------------------------------
# ------------------------------------------------------------------------------
# ------------------------------------------------------------------------------
# ------------------------------------------------------------------------------
# ------------------------------------------------------------------------------



