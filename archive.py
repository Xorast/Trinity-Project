import  os
import  csv
import  json
from    pymongo     import MongoClient


MONGODB_URI  =  os.environ.get("MONGODB_URI")
MONGODB_NAME =  os.environ.get("MONGODB_NAME")


# ARCHIVE THE OUTPUT DATA ONLINE [MONGODB DATABASE]
def push_to_online_mongo_db(output_full_path, output_fields_name):    


    def row_to_dict(row, output_fields_name):
        return { field : row[field] for field in output_fields_name }
    
    csvfile = open(output_full_path, 'r')
    reader  = csv.DictReader(csvfile, output_fields_name)
    next(reader)
    
    # Collection name = output_filename | Document name = output_filename | Might change that to distinguish one another
    
    archive_dictionary = { "output_file" : [row_to_dict(row, output_fields_name) for row in reader]}    
    
    try:
        with MongoClient(MONGODB_URI) as conn:
            db      = conn[MONGODB_NAME]
            coll    = db[output_full_path.split("/")[-1]]
            coll.insert(archive_dictionary)
        
    except BaseException as e:
            print ("Failed on_data: %s" % str(e))