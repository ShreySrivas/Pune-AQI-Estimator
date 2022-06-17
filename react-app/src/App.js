import './App.css';
import Header from './components/header';
import React from 'react';
import AqiForm from './components/aqiForm'

function App() {
  return (
    <div className="App">
      <Header/>
      <AqiForm/>
    </div>
  );
}

export default App;