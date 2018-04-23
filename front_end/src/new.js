import React from 'react';
import axios from 'axios';
import '../css/Weather.css';
import {getGeoLocation} from '../helpers/geolocation';

class HourlyWeather extends React.Component {
    constructor(){
    super()
    this.state = {
        HourlyWeather: [],
        reverseGeoLocation: [],
        CityState: {},
        LatLng: {}
        }
    }
    
    componentDidMount() {
        this.geoLocate()
    }

    getHourlyWeather() {
        const USstate = this.state.CityState.USstate;
        const city = this.state.CityState.city;
        axios.get(`http://api.wunderground.com/api/bfb68c7fd935c550/hourly/q/${USstate}/${city}.json`)
        .then(response => {
        this.setState({HourlyWeather: response.data.hourly_forecast});
        });
    }

    geoLocate() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const LatLng = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
                axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${LatLng.lat},${LatLng.lng}&key=AIzaSyCwT2vJgcdN6ts22XFyjbiLUC4ZrYLsEMs`)
                .then(res => {
                const reverseGeo = res.data.results;
                reverseGeo.map((address, i) => {
                    if (address.types[0] === "administrative_area_level_1") {
                        const city = address.address_components[0].long_name;
                        const state = address.address_components[0].short_name;
                        this.setState({
                            CityState: {
                                city: city,
                                USstate: state
                            }
                        }, ()=> {
                        })
                    }
                })
                this.setState({reverseGeoLocation: res.data.results});
                }).then(() => this.getHourlyWeather());
            })
        }
    }


        // API_KEY=AIzaSyCwT2vJgcdN6ts22XFyjbiLUC4ZrYLsEMs
      
    render() {
            const outputData = this.state.HourlyWeather;
        return (
            <div>
                <h2>Hourly Weather</h2>
                <table className="center">
                    <tbody>
                        <tr>
                            <th>Time</th>
                            <th>Temperature</th>
                            <th>Condition</th>
                            <th>Wind Speed</th>
                            <th>Feels Like</th>
                        </tr>
                            {outputData.map(function(hour, i){
                                return (
                                    <tr key={i}>
                                        <td>{hour.FCTTIME.pretty}</td> 
                                        <td>{hour.temp.english}&#176;F / {hour.temp.metric}&#176;C</td> 
                                        <td>{hour.condition}<img src={hour.icon_url} alt="weather-icon"/></td> 
                                        <td>{hour.wdir.dir} @ {hour.wspd.english}mph</td>
                                        <td>{hour.feelslike.english}&#176;F / {hour.feelslike.metric}&#176;C</td>
                                    </tr>
                                    )
                                })}
                    </tbody>
                </table>
            </div>
        )
    }
    
}

export default HourlyWeather;