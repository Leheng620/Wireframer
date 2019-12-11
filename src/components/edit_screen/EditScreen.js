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
    state = {
        wireframe: JSON.parse(JSON.stringify(this.props.wireframe)),
    }

    fixKey = (auth,wireframeLists) => {
        if(auth.uid){
          let newWireframeLists = wireframeLists;
          for(let i = 0; i < newWireframeLists.length; i++){
            newWireframeLists[i].key = i;
          }
          getFirestore().collection('users').doc(auth.uid).update({
            wireframeLists: newWireframeLists
          })
        }
    }

    updateDimension = (w, h) =>{
        let wireframe = this.state.wireframe;
        wireframe.width = Number(w);
        wireframe.height = Number(h);
        this.setState({wireframe: wireframe});
    }

    render(){
        if(!this.props.wireframe){
            return <React.Fragment/>;
        }
        if(!this.state.wireframe){
            this.props.history.goBack();
            this.fixKey(this.props.auth, this.props.wireframeLists);
            return <React.Fragment/>;
        }
        
        return(
            <div className='edit-screen-container'>
                <div className='wireframe-container'>
                    <LeftControl 
                        wireframe={this.state.wireframe}
                        updateDimension={this.updateDimension}
                    />

                    <div className='wireframe-panel control-panel white'>
                        <div style={{textAlign:'center',border:'solid'}}>
                            <h4>Work Place</h4>
                        </div>
                        <div id='work-place'>
                            <div className='' id='canvas' style={{width:this.state.wireframe.width, height:this.state.wireframe.height}}>

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