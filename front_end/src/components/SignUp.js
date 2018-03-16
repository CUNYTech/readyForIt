import React, {Component} from 'react';
import '../css/SignUp.css';

class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            showSignUp: false
        }
    }
    render () {
        
        return (
            <button 
                // onClick={(state) => this.handleClick(state)}
                className="btn"
                // id="sign-up"
                >Sign Up</button>
            // <div className="sign-up">
            //     <h1>Sign Up</h1>
            // </div>
        );
    }
}

export default SignUp;