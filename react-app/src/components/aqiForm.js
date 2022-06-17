import React, {useState} from 'react';
import './style.css'
function AqiForm() {
    const raw_location = ['Chinchwad', 'Karve Road', 'Nal Stop', 'Pimpri', 'Swargate', 'Bhosari']
    const locations = [];

    for(var i = 0; i < raw_location.length; i++) {
      var obj = {};

      obj['val'] = raw_location[i];
      obj['label'] = raw_location[i];
      locations.push(obj);
    }

    const [so2, setSo2] = useState('');
    const [nox, setNox] = useState('');
    const [rspm, setRspm] = useState('');
    const [spm, setSpm] = useState('');
    const [location, setLocation] = useState('Chinchwad');
    const [prediction, setPrediction] = useState(null);
    let [color, setColor] = useState(null)
    let [concern, setConcern] = useState(null)

    const handleInputChange = (e) => {
        const {id , value} = e.target;
        if(id === "so2"){
            setSo2(value);
        }
        if(id === "nox"){
            setNox(value);
        }
        if(id === "rspm"){
            setRspm(value);
        }
        if(id === "spm"){
            setSpm(value);
        }
        if(id === "location"){
            setLocation(value);
        }

    }

    const handleSubmit  = async (e) => {
      e.preventDefault();
      const inputData = {
        "so2": so2,
        "nox": nox,
        "rspm": rspm,
        "spm": spm,
        "location": location
      }
      const newData = JSON.stringify(inputData)
      console.log(newData);

      fetch("http://localhost:60000/estimate_aqi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: newData
      }).then(res => res.json())
      .then(data => {
        console.log(data['estimated_aqi']);
        setPrediction(data['estimated_aqi']);
        handleConcern(data['estimated_aqi']);
      });
    }
    const handleConcern  = async (prediction) => {
        /*console.log(so2,nox,rspm,spm,location);*/
      if (prediction)
    { 
      if (prediction <= 50)
      {
        setColor('#41ad32')
        setConcern('Good')
      }
      else if (prediction <= 100 && prediction > 50)
      {
      setColor('#d7de4b')
      setConcern('Moderate')
      }
      else if (prediction <= 200 && prediction > 100)
      {
      setColor('#de664b')
      setConcern('Poor')
      }
      else if (prediction <= 300 && prediction > 200)
      {
      setColor('#f051dd')
      setConcern('Unhealthy')
      }
      else if (prediction <= 400 && prediction > 300)
      {
      setColor('#a24ad9')
      setConcern('Severe')
      }
      else if (prediction <= 500 && prediction > 400)
      {
      setColor('#3d0114')
      setConcern('Hazardous')
      }
    } 
    }

    return(
      <div className="form">
        <form>
          <div className="form-body">
              <div className="form-group">
                  <label className="label label-default" htmlFor="so2"><b>SO2 Value:</b></label>
                  <input id="so2" className="form-control" value={so2} type="number" placeholder="SO2 µg/m3" name="so2" onChange = {(e) => handleInputChange(e)} required/>
              </div>
              <div className="form-group">
                  <label className="label label-default" htmlFor="nox"><b>NOx Value:</b></label>
                  <input id="nox" className="form-control" value={nox} type="number" placeholder="Nox µg/m3" name="nox" onChange = {(e) => handleInputChange(e)} required/>
              </div>
              <div className="form-group">
                <label className="label label-default" htmlFor="rspm"><b>RSPM Value:</b></label>
                <input id="rspm" className="form-control" value={rspm} type="number" placeholder="RSPM µg/m3" name="rspm" onChange = {(e) => handleInputChange(e)} required/>
              </div>
              <div className="form-group">
                <label className="label label-default" htmlFor="spm"><b>SPM Value:</b></label>
                <input id="spm" className="form-control" value={spm} type="number" placeholder="SPM" name="spm" onChange = {(e) => handleInputChange(e)} required/>
              </div>
              <div className="form-group">
              <label className="label label-default" htmlFor="location"><b>Location:</b></label>
                <select className="form-control" value={location} id="location" onChange = {(e) => handleInputChange(e)} required>
                {locations.map(({ val, label }, index) => <option key={val} val={val} >{label}</option>)}
                </select>
              </div>
          </div>
          <div className="footer">
              <button type="submit" onClick={(e)=>handleSubmit(e)} className="btn btn-primary">Estimate AQI</button>
          </div>
          <div className="prediction">
          {prediction && <span className='predictionText'><b>Estimated AQI: {prediction}</b></span>}
          {prediction && <div className='color' style={{backgroundColor: color}}><span className='concern' style={{color: "black"}}>Level of Health Concern: {concern}</span></div>}
          </div>
        </form>
      </div>      
    )       
}
export default AqiForm;