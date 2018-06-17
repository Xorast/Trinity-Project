import os
from   flask          import flash, request, redirect
from   werkzeug.utils import secure_filename


# CONTROLING THE INPUT FILE [DEFENSIVE] ----------------------------------------
def allowed_file(filename, allowed_extensions):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_extensions

# UPLOADING THE INPUT DATA -----------------------------------------------------
# code coming from the flask documentation : 
# http://flask.pocoo.org/docs/1.0/patterns/fileuploads/
# adapted to the need 

def file_uploading(app, upload_folder, allowed_extensions, max_file_size):
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
    if file and allowed_file(file.filename, allowed_extensions):
        app.config['MAX_CONTENT_LENGTH']     = max_file_size
        app.config['UPLOAD_FOLDER']          = upload_folder
        filename                             = secure_filename(file.filename)
        # Using the app for storing the filename variable
        app.config['input_filename']         = filename
        app.config['input_full_path']        = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(app.config['input_full_path'])
        return redirect('/')