import React, { Component } from 'react';

import {slide as Menu} from 'react-burger-menu';

import '../css/SideBar.css';


class SideBar extends Component {
    render () {
        return (
            <Menu className="menu">
                <h1>ReadyForIt</h1>
                <a id="weather" href=""><i className="fa fa-fw fa-cloud"></i><span>Weather Updates</span></a>
                <a id="donations" href=""><i className="fa fa-fw fa-ambulance"></i><span>Donations</span></a>
                <a id="people-say" href=""><i className="fa fa-fw fa-comments"></i><span>People Say</span></a>
                <a id="statistics" href=""><i className="fa fa-fw fa-history"></i><span>Statistics</span></a>
                
                <a id="sign-up" href="">Sign Up</a>
                
                <div id="social">
                    <a href="/facebook" className="fa fa-fw fa-facebook"></a>
                    <a href="/twitter" className="fa fa-fw fa-twitter"></a>
                    <a href="/instagram" className="fa fa-fw fa-instagram"></a>
                    <p>Copyright @ 2018 ReadyForIt. All rights reserved.</p>
                </div>
            </Menu>
        );
    }
}

export default SideBar;