import React from 'react';
import axios from 'axios';
import '../css/Weather.css';

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
        console.log(this.state.LatLng)
        this.getCityState()
        console.log( this.state.CityState)
        console.log('after weather called: ' + this.state.HourlyWeather) 
    }

    getHourlyWeather() {
        //Trying to pass the city and state to the api request url
        const test = this.state.CityState.USstate;
        console.log('test: '  + test);
        axios.get(`http://api.wunderground.com/api/bfb68c7fd935c550/hourly/q/NY`+`/Brooklyn.json`)
        .then(response => {
        this.setState({HourlyWeather: response.data.hourly_forecast});
        });
    }
    
    getCityState() {
        //need to pass the lat and lng from LatLng state to url below to reverse geocode
        axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=AIzaSyCwT2vJgcdN6ts22XFyjbiLUC4ZrYLsEMs')
        .then(res => {
        const reverseGeo = res.data.results;
        reverseGeo.map((address, i) => {
            if (address.types[0] === "administrative_area_level_1") {
                const city = address.address_components[0].long_name;
                const state = address.address_components[0].short_name;
                console.log(city);
                console.log(state)
                this.setState({
                    CityState: {
                        city: city,
                        USstate: state
                    }
                })
            }
        })
        this.setState({reverseGeoLocation: res.data.results});
        console.log("hello");
        }).then(() => this.getHourlyWeather());
    }

    geoLocate() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({
                        LatLng: {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        },
                    });
            })
        } else {
            this.setState({
                    LatLng: {
                        lat: 40.730610,
                        lng: -73.935242
                    }
                });
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