import React, { Component } from "react";
import "../css/SignUp.css";
// import ReactDOM from 'react-dom';
import Modal from "react-modal";

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
    this.setState({ modalIsOpen: true });
    this.props.handlerCloseSideBar();
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = "#f00";
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData();
    const form = event.target;
    fetch("/api/register", {
      method: "POST",
      body: new FormData(form)
    }).then(response => {
      if (response.status === 400) {
        response.json().then(jsonData => {
          console.log(jsonData);
          // Handle object stored in jsonData.Message
        });
      } else if (response.status === 201) {
        response.json().then(jsonData => {
          console.log(jsonData);
          // Handle object stored in jsonData.Message
        });
      }
    });
  }

  render() {
    return (
      <div id="element">
        <button onClick={this.openModal} className="btn2 signup">
          Sign Up
        </button>
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
          <h2 ref={subtitle => (this.subtitle = subtitle)} className="h2">
            Sign Up
          </h2>
          <form id="theForm" onSubmit={this.handleSubmit} className="form">
            <label htmlFor="name">Enter name</label>
            <input
              id="name"
              name="first_name"
              type="text"
              placeholder="name"
              title="Please enter valid name"
              pattern="[a-zA-z]{1,65}"
            />

            <label htmlFor="email">Enter your email</label>
            <input
              id="email"
              name="email"
              pattern="^[\w+-]{5,70}@[\w.-]+\.?\w+$"
              type="email"
              placeholder="readyforit@example.com"
              title="Please us a valid email"
            />

            <label htmlFor="tel">Enter your phone number</label>
            <input
              id="phone"
              name="phone_number"
              type="tel"
              pattern="\d?-?\s?\(?\d{3}\)?\s?-?\d{3}-?\s?\d{4}"
              placeholder="18625062457"
              title="Please use A valid Phone Number"
            />

            <label htmlFor="tel">Enter your zip code</label>
            <input
              id="zip_code"
              name="zip_code"
              type="text"
              pattern="^\d{5}$"
              placeholder="11377"
              title="Please use a Valid 5 Digit Zipcode"
            />
            <div className="clearfix">
              <button onClick={this.closeModal} className="cancelbtn">
                close
              </button>
              <button className="signupbtn">Submit</button>
            </div>
          </form>
        </Modal>
      </div>
    );
  }
}

export default SignUp;
// Modal.setAppElement(document.getElementById('element'));
