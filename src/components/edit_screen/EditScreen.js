import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { Button } from 'react-materialize';
import LeftControl from './LeftControl';
import RightControl from './RightControl';
import { Rnd } from "react-rnd";


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

    findControl(key){
        let controls = this.state.wireframe.controls;
        for(let i = 0; i < controls.length; i++){
            if(controls[i].key == Number(key)){
                return i;
            }
        }
    }

    createElement = (component) =>{
        const selected = this.state.wireframe.selected;
        let selectedKey;
        let hidden;
        if(selected){
            selectedKey = selected.key;
            hidden = (selectedKey !== component.key);
            
        }else{
            hidden = true
        }
        if(component.type === 'container'){
            // let wireframeWidth = 5000;
            // let wireframeHeight = 5000;
            // let wireframeBorderThickness = 3; //maybe different $$$$$$$$$$$$$$$$$$$$$$$$$$$
            // let topLimit = 0;
            // let downLimit = wireframeHeight- component.height - component.borderThickness*2 - wireframeBorderThickness*2;
            // let leftLimit = 0;
            // let rightLimit = wireframeWidth- component.width - component.borderThickness*2 - wireframeBorderThickness*2;
            return (
                // bounds={{top: topLimit, left: leftLimit, right: rightLimit, bottom: downLimit}}
                <Rnd key={component.key} default={{x: component.xPos, y: component.yPos, width:component.width, height:component.height}} 
                    bounds='parent' onDragStop={this.onDragStop} onResizeStop={this.onResizeStop}
                    enableResizing={{ top:false, right:false, bottom:false, left:false, topRight:!hidden, bottomRight:!hidden, bottomLeft:!hidden, topLeft:!hidden }} >
                    
                    <div id={component.key} 
                        style={{width:'100%', height:'100%', borderStyle:'solid',
                        borderRadius:component.borderRadius+'px', borderWidth:component.borderThickness+'px', borderColor:component.borderColor,
                        fontSize:component.fontSize+'px', color:component.textColor, backgroundColor:component.backgroundColor,
                        overflow:'hidden'}}>
                        {component.prop}
                    </div>
                    <div className="top-left-box" hidden={hidden}></div>
                    <div className="top-right-box" hidden={hidden}></div>
                    <div className="down-left-box" hidden={hidden}></div>
                    <div className="down-right-box" hidden={hidden}></div>
                </Rnd>
            )
        }
        else if(component.type === 'label'){
            // let wireframeWidth = 5000;
            // let wireframeHeight = 5000;
            // let wireframeBorderThickness = 3; //maybe different $$$$$$$$$$$$$$$$$$$$$$$$$$$
            // let topLimit = 0;
            // let downLimit = wireframeHeight- component.height - component.borderThickness*2 - wireframeBorderThickness*2;
            // let leftLimit = 0;
            // let rightLimit = wireframeWidth- component.width - component.borderThickness*2 - wireframeBorderThickness*2;
            return (
                <Rnd key={component.key} default={{x: component.xPos, y: component.yPos, width:component.width, height:component.height}} 
                bounds='parent' onDragStop={this.onDragStop} onResizeStop={this.onResizeStop}
                enableResizing={{ top:false, right:false, bottom:false, left:false, topRight:!hidden, bottomRight:!hidden, bottomLeft:!hidden, topLeft:!hidden }}>

                    <div id={component.key}
                        style={{width:'100%', height:'100%', borderStyle:'solid',
                        borderRadius:component.borderRadius+'px', borderWidth:component.borderThickness+'px', borderColor:component.borderColor,
                        fontSize:component.fontSize+'px', color:component.textColor, backgroundColor:component.backgroundColor,
                        overflow:'hidden'}}>
                            {component.prop}
                    </div>
                    <div className="top-left-box" hidden={hidden}></div>
                    <div className="top-right-box" hidden={hidden}></div>
                    <div className="down-left-box" hidden={hidden}></div>
                    <div className="down-right-box" hidden={hidden}></div>
                </Rnd>
            )
        }
        else if(component.type === 'button'){
            // let wireframeWidth = 5000;
            // let wireframeHeight = 5000;
            // let wireframeBorderThickness = 3; //maybe different $$$$$$$$$$$$$$$$$$$$$$$$$$$
            // let topLimit = 0;
            // let downLimit = wireframeHeight- component.height - component.borderThickness*2 - wireframeBorderThickness*2;
            // let leftLimit = 0;
            // let rightLimit = wireframeWidth- component.width - component.borderThickness*2 - wireframeBorderThickness*2;
            return (
                <Rnd key={component.key} default={{x: component.xPos, y: component.yPos, width:component.width, height:component.height}} 
                bounds='parent' onDragStop={this.onDragStop} onResizeStop={this.onResizeStop}
                enableResizing={{ top:false, right:false, bottom:false, left:false, topRight:!hidden, bottomRight:!hidden, bottomLeft:!hidden, topLeft:!hidden }}>
                    
                    <button id={component.key} className='default'
                        style={{width:'100%', height:'100%', cursor:'move',borderStyle:'solid',
                        borderRadius:component.borderRadius+'px', borderWidth:component.borderThickness+'px', borderColor:component.borderColor,
                        fontSize:component.fontSize+'px', color:component.textColor, backgroundColor:component.backgroundColor,
                        overflow:'hidden'}}>
                            {component.prop}
                    </button>
                    <div className="top-left-box" hidden={hidden}></div>
                    <div className="top-right-box" hidden={hidden}></div>
                    <div className="down-left-box" hidden={hidden}></div>
                    <div className="down-right-box" hidden={hidden}></div>
                </Rnd>
            )
        }
        else if(component.type === 'textfield'){
            // let wireframeWidth = 5000;
            // let wireframeHeight = 5000;
            // let wireframeBorderThickness = 3; //maybe different $$$$$$$$$$$$$$$$$$$$$$$$$$$
            // let topLimit = 0;
            // let downLimit = wireframeHeight- component.height - component.borderThickness*2 - wireframeBorderThickness*2;
            // let leftLimit = 0;
            // let rightLimit = wireframeWidth- component.width - component.borderThickness*2 - wireframeBorderThickness*2;
            return (
                
                <Rnd key={component.key} default={{x: component.xPos, y: component.yPos, width:component.width, height:component.height}} 
                bounds='parent' onDragStop={this.onDragStop} onResizeStop={this.onResizeStop}
                enableResizing={{ top:false, right:false, bottom:false, left:false, topRight:!hidden, bottomRight:!hidden, bottomLeft:!hidden, topLeft:!hidden }}>
                    
                    <input className='browser-default' id={component.key} readOnly
                        style={{width:'100%', height:'100%', cursor:'move', borderStyle:'solid',
                        borderRadius:component.borderRadius+'px', borderWidth:component.borderThickness+'px', borderColor:component.borderColor,
                        fontSize:component.fontSize+'px', color:component.textColor, backgroundColor:component.backgroundColor,
                        overflow:'hidden'}}defaultValue={component.prop} type='text' placeholder='Input' /> 
                    <div className="top-left-box" hidden={hidden}></div>
                    <div className="top-right-box" hidden={hidden}></div>
                    <div className="down-left-box" hidden={hidden}></div>
                    <div className="down-right-box" hidden={hidden}></div>
                </Rnd>
            )
        }
    }

    updateDimension = (w, h) =>{
        let wireframe = this.state.wireframe;
        wireframe.width = Number(w);
        wireframe.height = Number(h);
        this.setState({wireframe: wireframe});
    }

    addControl = (type,prop,w,h,backgroundColor,borderColor,br,bt) =>{
        let frame = this.state.wireframe;
        let controls = frame.controls;
        let len = controls.length==0 ? 0 : controls[controls.length-1].key + 1;
        let newControl = {
            type: type,
            key: len,
            height:h,
            width:w,
            xPos:0,
            yPos:0,
            backgroundColor:backgroundColor,
            borderColor: borderColor,
            borderRadius: br,
            borderThickness: bt,
            prop: prop,
            fontSize: 12,
            textColor: "#000000",
        }
        controls.push(newControl);
        console.log(controls);
        this.setState({wireframe:frame});
    }

    onDragStop=(e, d) => {
        let wireframe = this.state.wireframe;
        let control = this.state.wireframe.selected;
        control.xPos = d.x;
        control.yPos = d.y;
        this.setState({ wireframe: wireframe });
    }

    onResizeStop=(e, direction, ref, delta, position) => {
        let wireframe = this.state.wireframe;
        let control = this.state.wireframe.selected;
        control.width = ref.style.width.slice(0,ref.style.width.indexOf('p'));
        control.height = ref.style.height.slice(0,ref.style.width.indexOf('p'));
        control.xPos = position.x;
        control.yPos = position.y;
        this.setState({
          wireframe: wireframe
        });
        console.log(e);
    }

    duplicate = (e) => {
        e.preventDefault();
        let wireframe = this.state.wireframe;
        console.log(e.keyCode)
        if(e.ctrlKey && e.keyCode == 68 && wireframe.selected){
            e.preventDefault();
            let newControl = JSON.parse(JSON.stringify(wireframe.selected));
            let len = wireframe.controls.length==0 ? 0 : wireframe.controls[wireframe.controls.length-1].key + 1;
            newControl.xPos += (newControl.xPos-100)<0 ? 100 : 
                (newControl.xPos+100+newControl.width>wireframe.width) ? -100: 100;
            newControl.yPos += (newControl.yPos-100)<0 ? 100 : 
                (newControl.yPos + 100 + newControl.height > wireframe.height) ? -100: 100;;
            newControl.key = len;
            wireframe.selected = newControl;
            wireframe.controls.push(newControl);
            this.setState({wireframe: wireframe})
        }
        else if((e.keyCode == 8 || e.keyCode == 46) && wireframe.selected){
            e.preventDefault();
            let skey = wireframe.selected.key;
            let controls = wireframe.controls.filter(control => control.key !== skey);
            wireframe.selected = null;
            wireframe.controls = controls;
            console.log(this.state.wireframe);
            this.setState({wireframe: wireframe});
        }
    }

    // deleteControl = (e) => {
    //     let wireframe = this.state.wireframe;
    //     if((e.keyCode == 8 || e.keyCode == 127)&& wireframe.selected){
    //         e.preventDefault();
    //         this.fixControlsKey(wireframe);
    //         let skey = wireframe.selected.key;
    //         console.log(wireframe.controls);
    //         let controls = wireframe.controls.filter(control => control.key !== skey);
    //         console.log(controls);
    //         wireframe.selected = null;
    //         wireframe.controls = controls;
    //         this.fixControlsKey(wireframe);
    //         this.setState({wireframe: wireframe});
    //     }
    // }

    changeProperties = (property, value) => {
        let wireframe = this.state.wireframe;
        switch(property){
            case 'prop': wireframe.selected.prop = value; break;
            case 'fontSize': wireframe.selected.fontSize = value; break;
            case 'textColor': wireframe.selected.textColor = value; break;
            case 'backgroundColor': wireframe.selected.backgroundColor = value; break;
            case 'borderColor': wireframe.selected.borderColor = value; break;
            case 'borderThickness': wireframe.selected.borderThickness = value; break;
            case 'borderRadius': wireframe.selected.borderRadius = value; break;
            default :
        }
        this.setState({wireframe: wireframe})
    }

    select = (e) =>{
        let id = e.target.id;
        let wireframe = this.state.wireframe;
        if(id === 'canvas'){
            wireframe.selected = null;
            console.log("noooo selected");
            this.setState({wireframe: wireframe});
        }else{
            let index = this.findControl(id);
            console.log(index);
            wireframe.selected = wireframe.controls[index];
            console.log("selected" + wireframe.selected.key);
            this.setState({wireframe:wireframe});
        }
        console.log(wireframe.selected)
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
                            <div className='' tabIndex='0' id='canvas' style={{width:this.state.wireframe.width, height:this.state.wireframe.height}} onMouseDown={this.select} onKeyDown={this.duplicate}>
                                {this.state.wireframe.controls.map(c => this.createElement(c))}
                            </div>
                        </div>
                    </div>

                    <RightControl 
                        selected={this.state.wireframe.selected}
                        changeProperties={this.changeProperties}
                    />
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