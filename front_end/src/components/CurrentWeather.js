import React,  { Component } from 'react';
// import ReactDOM from 'react-dom';
// import axios from 'axios';
import ReactWeather from 'react-open-weather';

import { getGeoLocation } from '../helpers/geolocation';

class CurrentWeather extends Component {
  state = {
    lon: "-73.935242",
    lat: "40.730610",
    type: "geo"
  }

  componentWillMount(){
    getGeoLocation().then(latlng => {
      this.setState({
        lat: latlng[0].toFixed(10),
        lon: latlng[1].toFixed(10)
      });
    }).catch(error=> {
      this.setState({
        type: "auto"
      })
    });
  } 
  
  render() {   
    return (
      <ReactWeather
        forecast="today"
        unit="imperial"  
        apikey="f0c751300d9340ac8c9202734182503 "
        // type="city"
        // city="Manhattan"
        type={this.state.type}
        lon={this.state.lon}
        lat={this.state.lat}
    />     
    );
  }  
}

export default CurrentWeather;