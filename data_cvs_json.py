import os
import csv
import json
from pymongo import MongoClient
from data_processing import output_fields_name

# DEFINIR UNE FONCTION AVEC TOUS LES ARGUMENTS, QUI SERONT FOURNIS DEPUIS LA FONCTION PRINCIPLAE 
# def export_archive(archive_name, csvfile, output_fields_name):    
MONGODB_URI  =  os.environ.get("MONGODB_URI")
MONGODB_NAME =  os.environ.get("MONGODB_NAME")

# Name to be taken from an input on the html page OR generated automatically
# To be imported from the mainfile AS AN ARGUMENT (No import !!)
archive_name = "University_1_Doc_2"

# To be imported from the mainfile AS AN ARGUMENT (No import !!)
csvfile      = open('static/input_data_example_a.csv', 'r')
# jsonfile     = open('test_output.json', 'w')

# output_fields_name      = ['row','date','q','rain','temp','ETP_dint','peff','baseflow_1','baseflow_2','baseflow_3']

    
def row_to_dict(row, output_fields_name):
    return { field : row[field] for field in output_fields_name }

reader = csv.DictReader(csvfile, output_fields_name)
next(reader)

archive_dictionary = { "output_file" : [row_to_dict(row, output_fields_name) for row in reader]}    

# WRITING IN A REMOTE MONGO DATABASE
try:
    with MongoClient(MONGODB_URI) as conn:
        db      = conn[MONGODB_NAME]
        coll    = db[archive_name]
        coll.insert(archive_dictionary)
    
except BaseException as e:
        print ("Failed on_data: %s" % str(e))

