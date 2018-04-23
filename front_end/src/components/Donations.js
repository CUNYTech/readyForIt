import React, {Component} from 'react';
import '../css/Weather.css';
import '../css/Donations.css';
// import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import Donation from './Donation';

class Donations extends Component {
    constructor() {
        super();
        this.state = {
          modalIsOpen: false,
          donations: []

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

    grabDonations = (e) => {
        if (e.keyCode === 13) {
            const city = e.target.value;
            fetch(`/api/donations/${city}`)
            .then(response => response.json())
            .then(res => this.setState({donations: res.data}))
            .catch( this.setState({donations:[]}))
        }
    }

    render () {
        return (
            <div id="element">
                <button  
                    className="btn2" 
                    id="donations"
                    onClick={this.openModal}>
                    <i className="fa fa-fw fa-ambulance"></i>
                    <span>Donations</span>
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
                    Donations</h2>
                    <div className="weatherDisplay">
                        <input 
                            className="inputBox"
                            type="search" 
                            placeholder="Try searching locations, campaign titles and names" 
                            onKeyUp={this.grabDonations}/>
                    </div>
                    <div className="container">
                        {this.state.donations.length ?  
                        this.state.donations.map((donation,i) => (
                            <Donation key={`donate-${i}`} donation={donation}/>
                        ))    
                        
                        : null}
                    </div>
                </div>
                
            </Modal>
        </div>
        );
    }
}


export default Donations;