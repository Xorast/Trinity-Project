# BASEFLOW CALCULATION ---------------------------------------------------------
# MODEL 1 - Eckhardt filter ---------------------------------------------------- 
def baseflow_model_1(q, previous_q, a, BFI, dc_q):
    
    q           = float(q)
    previous_q  = float(previous_q)
    
    return str(round(((1 - BFI)*a*previous_q  +  (1 - a)*BFI*q) / (1 - a*BFI), dc_q))