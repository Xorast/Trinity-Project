import os
from flask          import Flask, flash, request, redirect, url_for, render_template, send_file
from data_input     import file_uploading
from data_output    import processing_data
from data_tools     import relative_path
from archive        import push_to_online_mongo_db

# SETTINGS ---------------------------------------------------------------------
# INPUT DATA
upload_folder           = relative_path('static/data/data_input')
output_folder           = 'static/data/data_output'
dlload_folder           = relative_path(output_folder)
allowed_extensions      = set(['csv'])
max_file_size           = 2 * 1024 * 1024 #2 megabytes

# OUTPUT DATA
# input_fields_name     = ['row','date','q','rain','temp','ETP_dint','peff']
output_fields_name      = ['row','date','q','rain','temp','ETP_dint','peff','baseflow_1','baseflow_2','baseflow_3']


app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def upload_file():
    
    if request.method == 'POST':
        
        file_uploading(app, upload_folder, allowed_extensions, max_file_size)
        
        app.config['output_filename']     = request.form['output_filename'] + '.csv'
        app.config['output_full_path']    = os.path.join(dlload_folder, app.config['output_filename'])
        processing_data(app.config['input_full_path'], app.config['output_full_path'], output_fields_name)
   
        return redirect('/charts')
        
    return render_template('index.html')

@app.route('/charts')
def displaying_charts():
    data_source = output_folder + "/" + app.config['output_filename']
    return render_template("charts.html", data_source = data_source)

# Need to create a feedback
@app.route('/DownloadOutputFile') 
def send_output_csv():
    return send_file(app.config['output_full_path'], mimetype='text/csv', attachment_filename = app.config['output_filename'], as_attachment=True)

@app.route('/archiveDataOnMongoDatabase') 
def archive():
    push_to_online_mongo_db(app.config['output_filename'], app.config['output_full_path'], output_fields_name)
    return redirect('/')
        
# ------------------------------------------------------------------------------

if __name__ == '__main__':
    app.run(host=os.getenv('IP', '0.0.0.0'), port=int(os.getenv('PORT', 8080)))

# ------------------------------------------------------------------------------