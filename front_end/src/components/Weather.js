import React, {Component} from 'react';
import '../css/Weather.css';
// import ReactDOM from 'react-dom';
import Modal from 'react-modal';

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
                <div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed arcu elit. Nullam tempor ante ornare enim ultricies, maximus rutrum felis euismod. Donec non lobortis sem. Suspendisse gravida ullamcorper lorem vel blandit. Nullam maximus elit sollicitudin ligula fringilla eleifend. Integer dolor velit, pellentesque lobortis auctor eu, laoreet eu neque. Aenean pretium risus et velit tristique dignissim. Nullam euismod ac ex vitae accumsan. Donec interdum commodo ligula sit amet pharetra. Nullam dignissim tristique nibh, eget interdum enim porttitor sit amet.</p>

                    <p>Praesent sed odio a felis condimentum congue non eget turpis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam sed massa elementum, finibus mauris a, efficitur turpis. Nulla posuere semper eros at tristique. Sed vel orci eu nisl efficitur auctor at vitae neque. Sed augue ante, tempus at placerat at, vehicula ut arcu. Cras aliquam a est sed iaculis. Nullam vehicula metus quis tortor facilisis, vel aliquam mi malesuada. In tristique pellentesque purus sit amet bibendum. Sed porttitor ex nulla, non semper urna fringilla quis. Nunc orci ipsum, vestibulum vitae sollicitudin euismod, sollicitudin eu magna.</p>

                    <p>Nullam tristique non libero et egestas. Morbi elementum, magna sit amet gravida vehicula, purus felis bibendum nulla, eu eleifend mauris nulla non leo. Morbi suscipit tellus nec ligula sodales pulvinar. Donec sollicitudin tortor egestas commodo luctus. Etiam eu accumsan eros, sed dignissim lacus. Cras porttitor egestas diam, ac tincidunt nisi. Aliquam erat volutpat. Sed sollicitudin massa vel rhoncus egestas. Aliquam molestie dolor ut justo interdum malesuada. Mauris quis lorem pulvinar, iaculis libero vel, aliquam nunc. Ut sagittis id erat sodales efficitur.</p>

                    <p>Phasellus malesuada luctus nisi, non elementum orci aliquam ac. Maecenas pellentesque mi quis massa accumsan luctus. In venenatis justo risus, eu dignissim sem tempus at. Etiam ante sem, rutrum vel feugiat maximus, ornare non lacus. In hac habitasse platea dictumst. Sed at massa ac justo fermentum porttitor. Suspendisse convallis lacus ac ipsum consequat placerat. Maecenas congue sapien nec ligula auctor consectetur. Nam vel maximus nisl.</p>

                    <p>Sed eget risus non quam finibus tempor non ac quam. Cras convallis laoreet enim at faucibus. Praesent malesuada turpis in elit dignissim dapibus. Donec lacinia mattis arcu, a lacinia ipsum tristique eu. Proin id congue erat, id congue elit. Integer tristique pharetra libero a feugiat. Nam imperdiet consequat enim ac vulputate. Duis lacus nisi, elementum sit amet dolor tristique, mattis sollicitudin elit. Proin tincidunt metus magna, et tristique dui aliquam ultrices. Nullam nec quam in nulla vulputate consectetur. Praesent vel lorem rhoncus, euismod metus a, pretium ante. Nulla facilisi. Cras commodo vel erat non tincidunt.</p>

                    <p>Donec eu dapibus libero. Sed id nibh dolor. Nam lobortis sed ante sed iaculis. Morbi finibus posuere pretium. Sed varius ultrices volutpat. Duis semper libero et libero vehicula, non tristique nunc pulvinar. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse sed libero libero. Donec sodales, nisl sed elementum accumsan, ex ex lacinia velit, non tincidunt turpis erat id est. Nulla elementum hendrerit felis eu convallis. Aliquam a sapien tellus. Phasellus eu nisl tellus. Vestibulum commodo egestas urna finibus gravida. Etiam pharetra urna sit amet lectus interdum tempor. Fusce vestibulum mi ut tortor sodales, eget convallis eros gravida. Vestibulum molestie neque a aliquam bibendum.</p>
                </div>
            </Modal>
        </div>
        );
    }
}


export default Weather;