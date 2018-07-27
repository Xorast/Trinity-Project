# BASEFLOW CALCULATIONS --------------------------------------------------------

# MODEL 1 - Eckhardt filter ---------------------------------------------------- 

def baseflow_model_1(q, previous_bf, a, BFI, dc_q):
    
    q           = float(q)
    previous_bf = float(previous_bf)
    
    return str(round(   ((1 - BFI)*a*previous_bf  +  (1 - a)*BFI*q) / (1 - a*BFI)    ,dc_q))
    
# MODEL 2 - <ModelName>     ---------------------------------------------------- 

# Model to be implemented.

# MODEL 3 - <ModelName>     ---------------------------------------------------- 

# Model to be implemented.

# MODEL 4 - <ModelName>     ---------------------------------------------------- 

# Model to be implemented.