import React,  { Component } from 'react';
// import ReactDOM from 'react-dom';
// import axios from 'axios';
import ReactWeather from 'react-open-weather';



class CurrentWeather extends Component {
   render() {   
    return (
      <ReactWeather
      forecast="today"
      unit="imperial"  
      apikey="f0c751300d9340ac8c9202734182503 "
      // type="city"
      // city="Manhattan"
      type="geo"
      lon="-73.935242"
      lat="40.730610"
      
    />     
    );
  }  
}

export default CurrentWeather;