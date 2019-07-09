import os
from application import upload_folder, dlload_folder

dir_list = [upload_folder, dlload_folder]

for directory in dir_list:
    
    print("Current dir:")
    print(directory)
    directory_name = directory
    
    test = os.listdir(directory_name)
    print("Files list in this dir:")
    print(test)
    
    for item in test:
        if item.endswith(".csv"):
            print(os.path.join(directory_name, item) + " deleted.")
            os.remove(os.path.join(directory_name, item))
