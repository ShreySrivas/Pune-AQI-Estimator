import json
from fastapi import FastAPI, Form, Request
from fastapi.encoders import jsonable_encoder
import uvicorn 
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import sys
import util


sys.path.append('../')
#from PuneAQI.config.definitions import ROOT_DIR

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:60000",
    "http://localhost:8080"


]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/ping")

async def ping():
    return "Hello buddy"
    
@app.post("/estimate_aqi")

async def estimate_aqi(request: Request):
    form_data = await request.json()
    form_data = jsonable_encoder(form_data)
    so2 = int(form_data['so2'])
    nox = int(form_data['nox'])
    rspm = int(form_data['rspm'])
    spm = int(form_data['spm'])
    location = str(form_data['location'])

    return {
        'estimated_aqi' : util.predict_AQI(location, so2, nox, rspm, spm)
    }
    


if __name__  ==  "__main__":
    uvicorn.run(app, host='localhost', port=60000)  