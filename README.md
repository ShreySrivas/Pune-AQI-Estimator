# Pune-AQI-Estimator

![image](https://user-images.githubusercontent.com/65944826/174290900-fa2b13cf-dc6e-4c57-bf67-34fe0e6aa10c.png)

## Purpose
An air quality index (AQI) is used by government agencies to communicate to the public how polluted the air currently is or how polluted it is forecast to become.AQI information is obtained by averaging readings from an air quality sensor, which can increase due to vehicle traffic, forest fires, or anything that can increase air pollution. Pollutants tested include ozone, nitrogen dioxide, sulphur dioxide, among others.
As the AQI rises, so do the risks to public health, particularly for children, the elderly, and people with respiratory or cardiovascular issues. During these times, governments generally encourage people to limit their outdoor physical activity or even avoid going out altogether. Face masks, such as cloth masks, may also be advised.
An AQI estimator could forcast potential surges in index value based upon core factors that could aid people into making informed decisions about being cautious and safe.

## Data
Dataset used is available on Kaggle with 8 columns and more than 3000 unique rows.

**Link to data:** https://www.kaggle.com/datasets/prathmeshn/pune-air-quality-index

## Feature Selection and Model Building
After some feature engineering and EDA, 7 features were chosen: SO2 µg/m3', 'Nox µg/m3', 'RSPM µg/m3', 'SPM', 'SO2 µg/m3 BDL', 'Nox µg/m3 BDL', 'Location'.

For model training various sklearn algorithms were used including linear regression, randomizedsearchcv using random forest regressor, gridsearchcv using adaboost regressor, stackingregressor employs the xgb regressor, random forest regressor, and the gradient boosting regressor. 

Randomizedsearchcv using random forest regressor gave best score of 0.997.

## Front End Application
React js was used to build a responsive web app where users can enter factor values (spm value, location etc.) and obtain correspoding estimated AQIs.
The result is accompanied by a strip of color which indicates the severity of the index value.

![image](https://user-images.githubusercontent.com/65944826/174256937-676a87d9-7fd4-4ac4-ba1b-f607ffedb56d.png)
 
Javascript was used to make components interactive and to send form data to the fast-api server to obtain the predicted value. It was also used to fetch the resultant data and display that to the user.

## Backend
Fast-API was used to process form requests from the web app. Functions were used to load model, to get feature columns and estimate predicted AQI based upon recieved data from the frontend. 

## Conclusion
This is just the beginning in applying machine learning to predicting AQI of a city. An advanced version of this app could notify citizens of rising AQI levels for that day or week so that people can take neccesary precautions while going outside or stay inside if neccesary.
