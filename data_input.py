import os
import time

from   flask          import flash, request, redirect
from   werkzeug.utils import secure_filename




# CONTROLING THE INPUT FILE [DEFENSIVE] ----------------------------------------
def allowed_extensions_check(filename, allowed_extensions):
    return ('.' in filename) and (filename.rsplit('.', 1)[1].lower() in allowed_extensions)

    
def file_check(allowed_extensions):
    
    if 'file' not in request.files:
        flash('No file part. Please try again.')
        return False
    
    file = request.files['file']
    if file.filename == '':
        flash('No selected file. Please try again.')
        return False
    
    if not(file and allowed_extensions_check(file.filename, allowed_extensions)):
        flash('File format not supported. Please try again with a ".csv" file.')
        return False
    
    return True



# UPLOADING THE INPUT FILE -----------------------------------------------------
def file_uploading(app):
    
    file            = request.files['file']
    filename        = '[' + time.strftime("%Y-%m-%d_%H-%M-%S") + ']__' + secure_filename(file.filename)
    input_full_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(input_full_path)
    
    return input_full_path


def get_timestamp(input_full_path):
    return input_full_path.split("/")[-1].split("__")[0]
    