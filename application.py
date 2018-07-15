import os
from flask          import Flask, flash, request, redirect, url_for, render_template, send_file, after_this_request
from data_input     import file_uploading
from data_output    import processing_data
from data_tools     import relative_path
from archive        import push_to_online_mongo_db
import  time


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
app.config['MAX_CONTENT_LENGTH']     = max_file_size
app.config['UPLOAD_FOLDER']          = upload_folder


@app.route('/', methods=['GET', 'POST'])
def upload_file():
    
    if request.method == 'POST':
        
        input_full_path  = file_uploading(app, allowed_extensions)
        output_filename  = input_full_path.split("/")[-1].split("__")[0] + "__" + request.form['output_filename'] + '.csv'
        output_full_path = os.path.join(dlload_folder, output_filename)
    
        return redirect(url_for('output_data_calculation',  input_full_path     = input_full_path, 
                                                            output_full_path    = output_full_path, 
                                                            output_filename     = output_filename   ))
        
    return render_template('index.html')
    
    
@app.route('/output_data_calculation')
def output_data_calculation():
    processing_data(request.args['input_full_path'], request.args['output_full_path'], output_fields_name)
    os.remove(relative_path(request.args['input_full_path']))
    return redirect(url_for('display_charts', output_filename=request.args['output_filename']))


@app.route('/charts')
def display_charts():
    data_source = os.path.join(output_folder, request.args['output_filename'])
    return render_template("charts.html", data_source = data_source)
    

# Need to create a feedback
@app.route('/DownloadOutputFile') 
def send_output_csv():
    return send_file(relative_path(request.args['data_source']), mimetype='text/csv', attachment_filename = request.args['data_source'].split("/")[-1], as_attachment=True)
    

@app.route('/archiveDataOnMongoDatabase') 
def archive():
    push_to_online_mongo_db(relative_path(request.args['data_source']), output_fields_name)
    return redirect(url_for('display_charts', output_filename=request.args['data_source'].split("/")[-1]))
    
@app.route('/deleteFiles')
def delete_files():
    os.remove(relative_path(request.args['data_source']))
    return redirect("/")

@app.route('/template')
def display_templates():
    return render_template("index_1.html")
    
# ------------------------------------------------------------------------------

if __name__ == '__main__':
    app.run(host=os.getenv('IP', '0.0.0.0'), port=int(os.getenv('PORT', 8080)))

# ------------------------------------------------------------------------------