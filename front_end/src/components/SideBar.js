import React, { Component } from 'react';

import {slide as Menu} from 'react-burger-menu';
import '../css/SideBar.css';


class SideBar extends Component {
    
    render () {
        return (
            
            <Menu className="menu">
                <h1>ReadyForIt</h1>
                
                <a id="weather" className="menu-item" href="/weather"><i className="fa fa-fw fa-cloud"></i><span>Weather Updates</span></a>
                <a id="donations" className="menu-item" href="/donations"><i className="fa fa-fw fa-ambulance"></i><span>Donations</span></a>
                <a id="people-say" className="menu-item" href="/people-say"><i className="fa fa-fw fa-comments"></i><span>People Say</span></a>
                <a id="statistics" className="menu-item" href="/statistics"><i className="fa fa-fw fa-history"></i><span>Statistics</span></a>
            </Menu>
        );
    }
}

export default SideBar;