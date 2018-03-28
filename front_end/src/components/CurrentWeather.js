import React,  { Component } from 'react';
// import ReactDOM from 'react-dom';
// import axios from 'axios';
import ReactWeather from 'react-open-weather';



class CurrentWeather extends Component {

   render() {   
    const lon = this.props.lon || "-73.935242";
    const lat = this.props.lat || "40.730610";
    return (
      <ReactWeather
        forecast="today"
        unit="imperial"  
        apikey="f0c751300d9340ac8c9202734182503 "
        // type="city"
        // city="Manhattan"
        type="geo"
        lon={lon}
        lat={lat}
    />     
    );
  }  
}

export default CurrentWeather;