import React,  { Component } from 'react';
import ReactWeather from 'react-open-weather';
import { getGeoLocation } from '../helpers/geolocation';
import 'react-open-weather/lib/css/ReactWeather.css';
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
    this.geoLocate()
    // getGeoLocation().then(latlng => {
    //   this.setState({
    //     LatLng: {
    //       lat: latlng[0].toFixed(10),
    //       lon: latlng[1].toFixed(10),
    //     }
    //   });
    // }).catch(error=> {
    //   this.setState({
    //     LatLng: {
    //       type: "auto"
    //     }
    //   })
    // });
  }

  geoLocate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                    LatLng: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                });
        })
    } else {
        this.setState({
                LatLng: {
                    lat: 0.730610,
                    lng: -73.935242,
                    type: "auto"
                }
            });
    }
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
