import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { Button } from 'react-materialize';
import LeftControl from './LeftControl';
import RightControl from './RightControl';
import Draggable from 'react-draggable';


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

    createElement = (component) =>{
        if(component.type === 'container'){
            let wireframeWidth = this.state.wireframe.width;
            let wireframeHeight = this.state.wireframe.height;
            let wireframeBorderThickness = 3; //maybe different $$$$$$$$$$$$$$$$$$$$$$$$$$$
            let topLimit = 0;
            let downLimit = wireframeHeight- component.height - component.borderThickness - wireframeBorderThickness;
            let leftLimit = 0;
            let rightLimit = wireframeWidth- component.width - component.borderThickness - wireframeBorderThickness;
            return (
                <Draggable key={component.key} defaultPosition={{x: component.xPos, y: component.yPos}} bounds={{top: topLimit, left: leftLimit, right: rightLimit, bottom: downLimit}} >
                    <div 
                        style={{width:component.width, height:component.height, borderStyle:'solid',
                        borderRadius:component.borderRadius, borderWidth:component.borderThickness, borderColor:component.borderColor,
                        fontSize:component.fontSize, color:component.textColor, backgroundColor:component.backgroundColor,
                        position:'absolute'}}>

                    </div>
                </Draggable>
            )
        }
        else if(component.type === 'label'){
            let wireframeWidth = this.state.wireframe.width;
            let wireframeHeight = this.state.wireframe.height;
            let wireframeBorderThickness = 3; //maybe different $$$$$$$$$$$$$$$$$$$$$$$$$$$
            let topLimit = 0;
            let downLimit = wireframeHeight- component.height - component.borderThickness - wireframeBorderThickness;
            let leftLimit = 0;
            let rightLimit = wireframeWidth- component.width - component.borderThickness - wireframeBorderThickness;
            return (
                <Draggable key={component.key} defaultPosition={{x: component.xPos, y: component.yPos}} bounds={{top: topLimit, left: leftLimit, right: rightLimit, bottom: downLimit}} >
                    <div 
                        style={{width:component.width, height:component.height, borderStyle:'solid',
                        borderRadius:component.borderRadius, borderWidth:component.borderThickness, borderColor:component.borderColor,
                        fontSize:component.fontSize, color:component.textColor, backgroundColor:component.backgroundColor,
                        position:'absolute'}}>
                            Prompt for Input:
                    </div>
                </Draggable>
            )
        }
        else if(component.type === 'button'){
            let wireframeWidth = this.state.wireframe.width;
            let wireframeHeight = this.state.wireframe.height;
            let wireframeBorderThickness = 3; //maybe different $$$$$$$$$$$$$$$$$$$$$$$$$$$
            let topLimit = 0;
            let downLimit = wireframeHeight- component.height - component.borderThickness - wireframeBorderThickness;
            let leftLimit = 0;
            let rightLimit = wireframeWidth- component.width - component.borderThickness - wireframeBorderThickness;
            return (
                <Draggable key={component.key} defaultPosition={{x: component.xPos, y: component.yPos}} bounds={{top: topLimit, left: leftLimit, right: rightLimit, bottom: downLimit}} >
                    <Button 
                        style={{width:component.width, height:component.height, borderStyle:'solid',
                        borderRadius:component.borderRadius, borderWidth:component.borderThickness, borderColor:component.borderColor,
                        fontSize:component.fontSize, color:component.textColor, backgroundColor:component.backgroundColor,
                        position:'absolute'}}>
                            button
                    </Button>
                </Draggable>
            )
        }
        else if(component.type === 'textfield'){
            let wireframeWidth = this.state.wireframe.width;
            let wireframeHeight = this.state.wireframe.height;
            let wireframeBorderThickness = 3; //maybe different $$$$$$$$$$$$$$$$$$$$$$$$$$$
            let topLimit = 0;
            let downLimit = wireframeHeight- component.height - component.borderThickness - wireframeBorderThickness;
            let leftLimit = 0;
            let rightLimit = wireframeWidth- component.width - component.borderThickness - wireframeBorderThickness;
            return (
                <Draggable key={component.key} defaultPosition={{x: component.xPos, y: component.yPos}} bounds={{top: topLimit, left: leftLimit, right: rightLimit, bottom: downLimit}} >
                    <input className='browser-default'
                        style={{width:component.width, height:component.height, borderStyle:'solid',
                        borderRadius:component.borderRadius, borderWidth:component.borderThickness, borderColor:component.borderColor,
                        fontSize:component.fontSize, color:component.textColor, backgroundColor:component.backgroundColor,
                        position:'absolute'}} type='text' placeholder='Input' /> 
                </Draggable>
            )
        }
    }

    updateDimension = (w, h) =>{
        let wireframe = this.state.wireframe;
        wireframe.width = Number(w);
        wireframe.height = Number(h);
        this.setState({wireframe: wireframe});
    }

    addControl = (type,w,h,backgroundColor,borderColor,br,bt) =>{
        let frame = this.state.wireframe;
        let controls = frame.controls;
        let newControl = {
            type: type,
            key:controls.length,
            height:h,
            width:w,
            xPos:0,
            yPos:0,
            backgroundColor:backgroundColor,
            borderColor: borderColor,
            borderRadius: br,
            borderThickness: bt,
            prop: type,
            fontSize: 12,
            textColor: "#000000",
        }
        controls.push(newControl);
        console.log(controls);
        this.setState({wireframe:frame});
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
                        addControl={this.addControl}
                    />

                    <div className='wireframe-panel control-panel white'>
                        <div style={{textAlign:'center',border:'solid'}}>
                            <h4>{this.props.wireframe.name}</h4>
                        </div>
                        <div id='work-place'>
                            <div className='' id='canvas' style={{width:this.state.wireframe.width, height:this.state.wireframe.height}}>
                                {this.state.wireframe.controls.map(c => this.createElement(c))}
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