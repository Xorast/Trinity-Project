# DOCUMENTATION

# http://www.pythonforbeginners.com/csv/using-the-csv-module-in-python
# https://docs.python.org/3/library/csv.html

# READING DATA -----------------------------------------------------------------

# with open(input_file_abs_path) as input_csvfile:
    
#     reader = csv.DictReader(input_csvfile, delimiter=',')
#     for row in reader:
#         print(row['date'], row['rain'])

# WRITING DATA -----------------------------------------------------------------

# with open(output_file_abs_path, 'w+', newline='') as output_csvfile:
    
#     writer = csv.DictWriter(output_csvfile, fieldnames=output_fields_name)
#     writer.writeheader()
#     writer.writerow({
#         'row_nb'    :'...',
#         'date'      :'...',
#         'q'         :'...',
#         'rain'      :'...',
#         'temp'      :'...',
#         'ETP_dint'  :'...',
#         'peff'      :'...',
#         'baseflow_1':'...',
#         'baseflow_2':'...',
#         'baseflow_3':'...',
#     })
    
# MAIN FUNCTION : MAKING OF THE OUTPUT FILE ------------------------------------

# with open(input_file_abs_path) as input_csvfile, open(output_file_abs_path, 'w+', newline='') as output_csvfile :
    
#     reader = csv.DictReader(input_csvfile, delimiter=',')
#     writer = csv.DictWriter(output_csvfile, fieldnames=output_fields_name)
    
#     writer.writeheader()
#     for row_line in reader:
#         writer.writerow({
#             'row'       :   row_line['row'],
#             'date'      :   row_line['date'],
#             'q'         :   row_line['q'],
#             'rain'      :   row_line['rain'],
#             'temp'      :   row_line['temp'],
#             'ETP_dint'  :   row_line['ETP_dint'],
#             'peff'      :   row_line['peff'],
#             'baseflow_1':   baseflow_model_1(row_line['q'], a, bfi),
#             'baseflow_2':   '',
#             'baseflow_3':   '',
#         })
# ------------------------------------------------------------------------------

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

#  -----------------------------------------------------------------------------


    
    
    
    # <!---->
    # <!---->
    # <!---->
 
    #     <!--<div class="row">-->
    #     <!--    <p>Work in process.</p>-->
    #     <!--    <p>The charts are interactive : you can zoom in (when it works...!) or click on them.</p>-->
    #     <!--    *** {{ data_source }} ***-->
    #     <!--</div>-->
        
    #     <!--<h1>Download your output file (.csv) :</h1>-->
    #     <!--<p>The file will be directly downloaded in your "download" folder</p>-->
    #     <!--<a href="/DownloadOutputFile">Download</a>-->
    #     <!--<form action="/DownloadOutputFile">-->
    #     <!--    <input type="hidden" name="data_source" value="{{ data_source }}"/>-->
    #     <!--    <input type="submit" onClick="downloadFeedback()" value="Download"/>-->
    #     <!--</form>-->
        
    #     <!--<h1>Archive your data online :</h1>-->
    #     <!--<p>The file will be archived on an online Mongo Database</p>-->
    #     <!--<form action="/archiveDataOnMongoDatabase">-->
    #     <!--    <input type="hidden" name="data_source" value="{{ data_source }}"/>-->
    #     <!--    <input type="submit" onClick="archiveFeedback()" value="Archive"/>-->
    #     <!--</form>-->
        
    #     <!--<h1>Delete files :</h1>-->
    #     <!--<p>The files will be deleted from the server</p>-->
    #     <!--<form action="/deleteFiles">-->
    #     <!--    <input type="hidden" name="data_source" value="{{ data_source }}"/>-->
    #     <!--    <input type="submit"  value="Delete"/>-->
    #     <!--</form>-->
        
        
    #     <!--<h1>Reset all filters : </h1>-->
    #     <!--<button id="resetAll"  onclick="resetAll()" >Reset All</button>-->
    #     <!--<button id="dateRange" onclick="dateRange()">dateRange</button>-->
    #     <!--<button id="resetAll" onclick="makeGraph()">Reset All</button>-->
        
    #     <!--<div class="row">-->
    #     <!--    <p><strong>Chart_III_A1 - [Data distribution within seasons]</strong></p>-->
    #     <!--    <div id="chart_III_A1"></div>-->
    #     <!--</div>-->
        
    #     <!--<div class="test">-->
    #     <!--    <p>Testing stuff</p>-->
    #     <!--</div>-->
        
    #     <!--<div class="row test">-->
    #     <!--    <p><strong>Chart_I_A1 - [Baseflow & Rain]</strong></p>-->
    #     <!--    <div id="chart_I_A"></div>-->
    #     <!--</div>-->
        
    #     <!--<div class="row">-->
    #     <!--    <p><strong>Chart_I_B1 - [Rain & ETP]</strong></p>-->
    #     <!--    <div id="chart_I_B1"></div>-->
    #     <!--</div>-->
        
    #     <!--<div class="row">-->
    #     <!--    <p><strong>Chart_II_A1 - [Flow distribution]</strong></p>-->
    #     <!--    <div id="chart_II_A1"></div>-->
    #     <!--    <div id="chart_II_A2"></div>-->
    #     <!--    <div id="chart_II_A3"></div>-->
    #     <!--    <div id="chart_II_A4"></div>-->
    #     <!--</div>-->
        
    #     <!--<div class="row">-->
    #     <!--    <p><strong>Chart_II_B1 - [Cumulative rain]</strong></p>-->
    #     <!--    <div id="chart_II_B1"></div>-->
    #     <!--</div>-->
  