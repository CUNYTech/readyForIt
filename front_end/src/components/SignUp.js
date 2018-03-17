import React, {Component} from 'react';
import '../css/SignUp.css';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

// const customStyles = {
//   content : {
//     top                   : '50%',
//     left                  : '50%',
//     right                 : 'auto',
//     bottom                : 'auto',
//     marginRight           : '-50%',
//     transform             : 'translate(-50%, -50%)'
//   }
// };

class SignUp extends Component {
    constructor() {
        super();
        this.state = {
          modalIsOpen: false
        };
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    
     
    openModal() {
        this.setState({modalIsOpen: true});
    }
     
    afterOpenModal() {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#f00';
    }
     
    closeModal() {
        this.setState({modalIsOpen: false});
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        
        fetch('/api/form-submit-url', {
          method: 'POST',
          body: data,
        });
    }

    render () {
        return (
            <div id="element">
            <button onClick={this.openModal} className="btn">Sign Up</button>
            <Modal
                isOpen={this.state.modalIsOpen}
                ariaHideApp={false}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                // style={customStyles}
                contentLabel="Example Modal"
                className="modal"
                overlayClassName="modal-overlay"
            >
            <h2 
                ref={subtitle => this.subtitle = subtitle}
                className="h2">
                Sign Up</h2>
            <form onSubmit={this.handleSubmit} className="form">
                <label htmlFor="username">Enter name</label>
                <input id="username" name="username" type="text" />

                <label htmlFor="email">Enter your email</label>
                <input id="email" name="email" type="email" />

                <label htmlFor="tel">Enter your phone number</label>
                <input id="tel" name="tel" type="tel" />

                <label htmlFor="tel">Enter your zip code</label>
                <input id="zipcode" name="zipcode" type="text" pattern="[0-9]{5}" />
                <div className="clearfix">
                    <button 
                        onClick={this.closeModal}
                        className="cancelbtn">close</button>
                    <button class="signupbtn">Submit</button>
                </div>
            </form>
        </Modal>
        </div>
        );
    }
}


export default SignUp;
// Modal.setAppElement(document.getElementById('element'));