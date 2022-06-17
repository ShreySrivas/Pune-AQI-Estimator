import json
import pickle
import numpy as np
import sys
import os
#sys.path.append('../')
from config.definitions import ROOT_DIR

__model = None
__columns = None

def predict_AQI(location, so2, nox, rspm, spm):
    global __model
    global __columns
    get_model()
    get_columns()

    loc = f"Location_{location.lower()}"

    try:
        loc_index = __columns.index(loc)
    except:
        loc_index = -1

    predictor = np.zeros(len(__columns))
    predictor[0] = so2  
    predictor[1] = nox
    predictor[2] = rspm
    predictor[3] = spm
    #so2 bdl = so2 < 4
    #nox bdl = nox < 9
    if so2 < 4:
        predictor[4] = 1

    if nox < 9:
        predictor[5] = 1
        
    if loc_index >= 0:
        predictor[loc_index] = 1

    return round(__model.predict([predictor])[0],2)

def get_model():
    global __model
    with open(os.path.join(ROOT_DIR, 'pune_AQI_model.pkl'), "rb") as file:
        __model = pickle.load(file)

def get_columns():
    global __columns
    with open(os.path.join(ROOT_DIR, 'pune_AQI_columns.json'), "r") as f:
        __columns = json.load(f)['feature_columns']
    
#p = round(predict_AQI('Bhosari', 33, 70, 126, 394),2)
#print(p)