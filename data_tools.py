import os


# GETTING ABSOLUTE PATH FROM RELATIVE ONE --------------------------------------
def relative_path(rel_file_path):
    return os.path.join(os.path.dirname(__file__),rel_file_path)
    
    
# DATA - NUMBER OF DECIMAL KEPT FROM THE INPUT STRING DATA ---------------------
def data_cleaning(value_as_string, dc_):
    if '.' in value_as_string :
        value_as_string = value_as_string.split('.',1)[0] + '.' + value_as_string.split('.',1)[1][:dc_]
    return value_as_string