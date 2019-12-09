import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

class EditScreen extends Component{
    render(){
        return(
            <div>
                wtf
            </div>
        )
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(),
)(EditScreen);