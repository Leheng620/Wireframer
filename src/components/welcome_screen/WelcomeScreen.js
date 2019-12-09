import React, { Component } from 'react';
import LoggedOutLinks from '../navbar/LoggedOutLinks';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';

class WelcomeScreen extends Component{
    render(){
        if(this.props.auth.uid){//return to home screen if is login
            return <Redirect to={"/wireframe/"+this.props.auth.uid} />; 
        }
        return(
            <div>
                <div>
                    <LoggedOutLinks />
                </div>
                <div>
                    <NavLink to="/login">Login</NavLink>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.firebase.auth,
});
  
export default compose(
    firebaseConnect(),
    connect(mapStateToProps),
)(WelcomeScreen);