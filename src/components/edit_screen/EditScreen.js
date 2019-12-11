import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { Button } from 'react-materialize';
import LeftControl from './LeftControl';
import RightControl from './RightControl';


class EditScreen extends Component{
    render(){
        if(!this.props.wireframe){
            return <React.Fragment/>;
        }
        return(
            <div className='edit-screen-container'>
                <div className='wireframe-container'>
                    <LeftControl />

                    <div className='wireframe-panel control-panel white'>
                        <div style={{textAlign:'center',border:'solid'}}>
                            <h4>Work Place</h4>
                        </div>
                        <div id='work-place'>
                            <div className='' id='canvas'>

                            </div>
                        </div>
                    </div>

                    <RightControl />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const { key } = ownProps.match.params;
    const { wireframeLists } = state.firebase.profile;
    let wireframe = wireframeLists ? wireframeLists[0] : null;
    if(wireframe){ //Move recent wireframe to top of the list will cause render twice
        //make sure the two renders are rendering the same wireframe
        if(wireframeLists[0].key != key){
            wireframe = wireframeLists[key];
        }
    }
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