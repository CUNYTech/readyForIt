import React, {Component} from 'react';
import '../css/Weather.css';
// import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import CurrentWeather from './CurrentWeather';

class Weather extends Component {
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
        this.props.handlerCloseSideBar();
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
                <button  
                    className="btn2" 
                    id="weather"
                    onClick={this.openModal}>
                    <i className="fa fa-fw fa-cloud"></i>
                    <span>Weather Updates</span>
                </button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    ariaHideApp={false}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    // style={customStyles}
                    contentLabel="Example Modal"
                    className="weather"
                    overlayClassName="modal-overlay"
                >
                <div>
                    <button 
                        className="buttonClose"
                        onClick={this.closeModal}
                        ><i className="fa fa-fw fa-times"></i></button>
                    <h2 
                        ref={subtitle => this.subtitle = subtitle}
                        className="h2">
                    Weather Updates</h2>
                    
                </div>
                <div className="weatherDisplay">
                    <CurrentWeather />
                </div>
            </Modal>
        </div>
        );
    }
}


export default Weather;