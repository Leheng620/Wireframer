import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

class EditScreen extends Component{

    

    render(){
        if(!this.props.wireframe){
            return <React.Fragment/>;
        }
        return(
            <div>
                <h1>{this.props.wireframe.name}</h1>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log(ownProps);
    const { key } = ownProps.match.params;
    const { wireframeLists } = state.firebase.profile;
    const wireframe = wireframeLists ? wireframeLists[key] : null;
    return {
        wireframe,
        auth: state.firebase.auth,
        wireframeLists,
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect(),
)(EditScreen);