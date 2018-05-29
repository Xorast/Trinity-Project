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

# test_list = ['bonjour','merci','hello','thank you','au-revoir']

# for element in test_list:
#     print(element - 1, element)

# print(round(2.06,1))
# print(round(2.04,1))
# string = "NA"

# if '.' in string :
#     string = string.split('.',2)
#     string = string[0] + '.' + string[1][:2]

# print(string)
# nb_dec = 1
# value_as_string = "0"
# if '.' in value_as_string or value_as_string == '0':
#     value_as_string = value_as_string.split('.',nb_dec)
#     print(value_as_string[0])
#     print(value_as_string[1])
#     value_as_string[1] = value_as_string[1] + '0000' 
#     print(value_as_string[1])
#     value_as_string = value_as_string[0] + '.' + value_as_string[1][:nb_dec]
# print(value_as_string)  

# nb_dec = 3
# value_as_string = '0.1234568'
# if '.' in value_as_string :
#     value_as_string = value_as_string.split('.',nb_dec)[0] + '.' + value_as_string.split('.',nb_dec)[1][:nb_dec]
# print(value_as_string)

a = 10

def test():
    return a
    
print(test())

print('0.123456'.split('.',1))