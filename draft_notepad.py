# OUTPUT DATA ------------------------------------------------------------------
# row         = 'data_1' 
# date        = 'data_2'
# q           = 'data_3'
# rain        = 'data_4'
# temp        = 'data_5'
# ETP_dint    = 'data_6'
# peff        = 'data_7'

# listDataLine = [row, date, q, rain, temp, ETP_dint, peff]


# # WRITING DATA -----------------------------------------------------------------

# def data_csv_format(listDataLine):

#     comma = ','
#     endOfLine = '\n'
    
#     return comma.join(listDataLine) + endOfLine
    
# def data_writing(relative_file_path, newLine):

#     f = open(relative_path(relative_file_path), "a")
#     f.write(newLine)
#     f.close()
    
# data_writing("../data/output/test.csv",data_csv_format(listDataLine))

# # ----------------------------------------------------------------------------

#     writer.writerow({'rain': 'testing', 'date': 'testings'})
#     writer.writerow({'rain': 'testing', 'date': 'testings'})
#     writer.writerow({'rain': 'Ltesting', 'date': 'testing'})
#     writer.writerow({'rain': 'Wondtesting', 'date': 'testing'})

test_list = ['bonjour','merci','hello','thank you','au-revoir']

for element in test_list:
    print(element - 1, element)
    