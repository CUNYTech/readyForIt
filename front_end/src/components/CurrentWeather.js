import React,  { Component } from 'react';
import ReactWeather from 'react-open-weather';
import moment from 'moment';
import { getGeoLocation } from '../helpers/geolocation';
import WeatherIcon from 'react-open-weather-icons';
import 'react-open-weather/lib/css/ReactWeather.css';
import axios from 'axios';
import HourlyWeather from './HourlyWeather';

class CurrentWeather extends Component {
  constructor(props){
    super(props)
    this.state = {
      LatLng: {
        lon: "-73.935242",
        lat: "40.730610",
        type: "geo",
      },
      // HourlyWeather: []
    };
  }
  // componentDidMount() {
  //   axios.get('http://api.wunderground.com/api/bfb68c7fd935c550/hourly/q/CA/San_Francisco.json')
  //   .then(response => this.setState({HourlyWeather: response.data.hourly_forecast}))
  //   .catch(this.setState({HourlyWeather: []}));
  //   // .then(response => {
  //   //   const hourForecast = response.data.hourly_forecast.map(hourInc => {
  //   //   });
  //   //   this.setState({
  //   //     HourlyWeather: response.data.hourly_forecast
  //   //   });  
  //   // });
  // }



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
   
    // <li key={i}>Time: {hour.FCTTIME.hour}</li>
      //  <li key={i}>TIME: {hour.FCTTIME.hour} Temperature: {hour.temp} Condition: {hour.condition}</li>
      
      
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

  //  this.state.HourlyWeather.map(function(hour, i){
  //           return <li key={i}>{hour.}</li>
  //         }) 