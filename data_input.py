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

def file_uploading(app, allowed_extensions):
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
        filename        = secure_filename(file.filename)
        input_full_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(input_full_path)
        return input_full_path