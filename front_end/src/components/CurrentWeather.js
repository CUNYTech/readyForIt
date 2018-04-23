import React,  { Component } from 'react';
import ReactWeather from 'react-open-weather';
import { getGeoLocation } from '../helpers/geolocation';
// import WeatherIcon from 'react-open-weather-icons';
import 'react-open-weather/lib/css/ReactWeather.css';
// import axios from 'axios';
import HourlyWeather from './HourlyWeather';
import '../css/CurrentWeather.css';

class CurrentWeather extends Component {
  constructor(props){
    super(props)
    this.state = {
      LatLng: {
        lon: "-73.935242",
        lat: "40.730610",
        type: "geo",
      }
    };
  }

  componentWillMount(){
    getGeoLocation().then(latlng => {
      this.setState({
        LatLng: {
          lat: latlng[0].toFixed(10),
          lon: latlng[1].toFixed(10),
        }
      });
    }).catch(error=> {
      this.setState({
        LatLng: {
          type: "auto"
        }
      })
    });
  }

  render() {
    return (
      <div>
      <ReactWeather
        forecast="today"
        unit="imperial"  
        apikey="f0c751300d9340ac8c9202734182503"
        icon="01d"
        name="04d"
        type={this.state.LatLng.btype}
        lon={this.state.LatLng.lon}
        lat={this.state.LatLng.lat}
        forecast="5days"    
    />
      <HourlyWeather/>
     </div>
    );
   
  }  
}

export default CurrentWeather;
