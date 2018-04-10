import React, { Component } from 'react';
import Map from './Map';
import CurrentWeather from './CurrentWeather';
//import logo from '../css/logo.svg';
import '../css/App.css';


class App extends Component {
    render() {
        return (
            <div className="App">
                <Map />
            </div>
            
            
            
        )
    }
}

export default App;
