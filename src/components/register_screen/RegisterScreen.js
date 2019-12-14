import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { registerHandler } from '../../store/database/asynchHandler'

class RegisterScreen extends Component {
  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  }

  handleChange = (e) => {
    const { target } = e;

    this.setState(state => ({
      ...state,
      [target.id]: target.value,
    }));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    
    const { props, state } = this;
    const { firebase } = props;
    const newUser = { ...state };

    this.checkValidName(state);
    this.checkValidPassword(state);

    props.register(newUser, firebase);
  }

  checkValidName = (state) => {
    let first = state.firstName;
    let second = state.lastName;
    if (first === ""){
      document.getElementById('fname-error').innerHTML = "First name cannot be empty";
    }else{
      document.getElementById('fname-error').innerHTML = "";
    }
    if (second === ""){
      document.getElementById('sname-error').innerHTML = "Last name cannot be empty";
    }else{
      document.getElementById('sname-error').innerHTML = "";
    }
  }

  checkValidPassword = (state) => {
    let password = state.password;
    if (password === ''){
      document.getElementById('password-error').innerHTML = "Password cannot be empty";
    }else{
      document.getElementById('password-error').innerHTML = "";
    }
  }
  

  render() {
    const { auth, authError } = this.props;
    if (auth.uid) {
      // return <Redirect to={"/wireframe/"+auth.uid} />;
      return <Redirect to="/" />;
    }

    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} style={{backgroundColor:'beige'}}>
          <h5 className="grey-text text-darken-3">Register</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>            
            <input type="email" name="email" id="email" onChange={this.handleChange} />
            <span className="right red-text large" id="email-error"></span>
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" onChange={this.handleChange} />
            <span className="right red-text large" id="password-error"></span>
          </div>
          <div className="input-field">
            <label htmlFor="firstName">First Name</label>
            <input type="text" name="firstName" id="firstName" onChange={this.handleChange} />
            <span className="right red-text large" id="fname-error"></span>
          </div>
          <div className="input-field">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" name="lastName" id="lastName" onChange={this.handleChange} />
            <span className="right red-text large" id="sname-error"></span>
          </div>
          <div className="input-field">
            <button type="submit" className="btn pink lighten-1 z-depth-0">Sign Up</button>
            {authError ? <div className="red-text center"><p>{authError}</p></div> : null}
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  authError: state.auth.authError,
});

const mapDispatchToProps = dispatch => ({
  register: (newUser, firebase) => dispatch(registerHandler(newUser, firebase)),
});

export default compose(
  firebaseConnect(),
  connect(mapStateToProps, mapDispatchToProps),
)(RegisterScreen);