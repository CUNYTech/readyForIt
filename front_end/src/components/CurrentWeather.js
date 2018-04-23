import React,  { Component } from 'react';
import ReactWeather from 'react-open-weather';
import moment from 'moment';
import { getGeoLocation } from '../helpers/geolocation';
import WeatherIcon from 'react-open-weather-icons';
import 'react-open-weather/lib/css/ReactWeather.css';

class CurrentWeather extends Component {
  state = {
    lon: "-73.935242",
    lat: "40.730610",
    type: "auto",

  }

  componentWillMount(){
    getGeoLocation().then(latlng => {
      this.setState({
        lat: latlng[0].toFixed(10),
        lon: latlng[1].toFixed(10),

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
        apikey="f0c751300d9340ac8c9202734182503"
        icon="01d"
        name="04d"
        type={this.state.type}
        lon={this.state.lon}
        lat={this.state.lat}
        forecast="5days"    
    />
    
    );
  
     {/*<WeatherIcon name="01d" className="my-awesome-icon" />*/}
   
  }  
}

export default CurrentWeather;