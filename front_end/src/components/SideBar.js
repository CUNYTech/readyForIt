import React, { Component } from 'react';
import SignUp from './SignUp';
import Weather from './Weather';
import {slide as Menu} from 'react-burger-menu';

import '../css/SideBar.css';


class SideBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            menuOpen: false
        }
        this.handler = this.handler.bind(this);
    }

    handleStateChange (state) {
        this.setState({menuOpen: state.isOpen})  
    }
      
    // This can be used to close the menu, e.g. when a user clicks a menu item
    handler(e) {
        e.preventDefault();    
        this.setState({
            menuOpen: false
        });
    }
    render () {
        return (
            <Menu 
                className="menu"
                isOpen={this.state.menuOpen}
                onStateChange={(state) => this.handleStateChange(state)}
            >
                <h1>ReadyForIt</h1>
                <Weather />
                <button className="btn2" id="donations"><i className="fa fa-fw fa-ambulance"></i><span>Donations</span></button>
                <button className="btn2" id="people-say"><i className="fa fa-fw fa-comments"></i><span>People Say</span></button>
                <button className="btn2" id="statistics"><i className="fa fa-fw fa-history"></i><span>Statistics</span></button>
                <SignUp handler={this.handler}/>
                <div id="social">
                    <a href="/" className="fa fa-fw fa-facebook"></a>
                    <a href="/" className="fa fa-fw fa-twitter"></a>
                    <a href="/" className="fa fa-fw fa-instagram"></a>
                    <p>Copyright @ 2018 ReadyForIt. All rights reserved.</p>
                </div>
            </Menu>
        );
    }
}

export default SideBar;