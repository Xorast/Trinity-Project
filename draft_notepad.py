import time


# print(time.strftime("%Y-%m-%d_%H-%M-%S__"))
# print(string.split("/")[-1][:3])


string = "bla/bla/bla/" + time.strftime("%Y-%m-%d_%H-%M-%S__") + "bla3.csv" 
print(string.split('/')[-1].split("__")[0])



