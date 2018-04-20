import React from 'react';
import axios from 'axios';
import '../css/Weather.css';

class HourlyWeather extends React.Component {
    constructor(){
    super()
    this.state = {
        HourlyWeather: []
        }
    }
    
    componentDidMount() {
        axios.get('http://api.wunderground.com/api/bfb68c7fd935c550/hourly/q/NY/New_York.json')
        .then(response => {
            const hourlyData = response.data.hourly_forecast;
            this.setState({HourlyWeather: response.data.hourly_forecast});
            });
        }
      
    render() {
            const outputData = this.state.HourlyWeather;
        return (
            <div>
                <h2>Hourly Weather</h2>
                <table className="center">
                    <tr>
                        <th>Time</th>
                        <th>Temperature</th>
                        <th>Condition</th>
                        <th>Wind Speed</th>
                        <th>Feels Like</th>
                    </tr>
                        {outputData.map(function(hour, i){
                            return (
                                <tr>
                                    <td key={i}>{hour.FCTTIME.pretty}</td> 
                                    <td key={i}>{hour.temp.english}&#176;F / {hour.temp.metric}&#176;C</td> 
                                    <td key={i}>{hour.condition}<img src={hour.icon_url}/></td> 
                                    <td key={i}>{hour.wdir.dir} @ {hour.wspd.english}mph</td>
                                    <td key={i}>{hour.feelslike.english}&#176;F / {hour.feelslike.metric}&#176;C</td>
                                </tr>
                            )
                            })}
                </table>
            </div>
        )
    }
    
}

export default HourlyWeather;