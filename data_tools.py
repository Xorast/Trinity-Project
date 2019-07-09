import os


def relative_path(rel_file_path):
    """ Get the absolute path from a relative one. """
    return os.path.join(os.path.dirname(__file__), rel_file_path)
    

def data_cleaning(value_as_string, dc_):
    """ Trim the float number stored as a string to `dc_` decimals. """
    if '.' in value_as_string:
        value_as_string = value_as_string.split('.', 1)[0] + '.' + value_as_string.split('.', 1)[1][:dc_]
    return value_as_string
