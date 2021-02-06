import React, { Component } from 'react';
import { Modal,Button } from 'react-materialize';

class LeftControl extends Component{

    state = {
        disableUdate: true,
        width: this.props.wireframe.width,
        height: this.props.wireframe.height,
        widthError: false,
        heightError: false,
    }

    handleWidthChange = (e) => {
        this.setState({disableUdate: false, width: e.target.value});
    }
    handleHeightChange = (e) =>{
        this.setState({disableUdate: false, height: e.target.value});
    }
    handleUpdate = () => {
        const { width, height } = this.state;
        let widthError = false;
        let heightError = false;
        if(!Number(width) || !Number.isInteger(Number(width)) || Number(width) < 1 || Number(width) > 5000){
            widthError = true;
        }if(!Number(height) || !Number.isInteger(Number(height)) || Number(height) < 1 || Number(height) > 5000){
            heightError = true;
        }
        if(widthError || heightError){
            this.setState({widthError: widthError, heightError: heightError, disableUdate:true});
        }else{
            this.setState({widthError: widthError, heightError: heightError, disableUdate:true});
            this.props.updateDimension(width, height);
        }
    }

    triggerClosingDialog = () => {
        if(!this.props.save){
            return (
                <Modal 
                    actions={[
                    <Button className="red" modal="close" onClick={this.props.handleClose} style={{marginRight:'10px'}}>Confirm</Button>,
                    <Button modal="close" >cancel</Button>]}
                    trigger={<Button className='wireframe-option-control-button' id='wireframe-option-control-close'>close</Button>
                }
                    header="Go back to home page without saving?"
                    >
                    <strong style={{fontSize:"X-large"}}>You have work that has not been saved, exit anyways?</strong>
                    <br/>
                    <strong style={{fontSize:"x-large",fontWeight:'bolder'}}>All changes will be gone.</strong>
                </Modal>
            )
        }else{
            return (
                <Button className='wireframe-option-control-button' id='wireframe-option-control-close' onClick={this.props.handleClose} >close</Button>
            )
        }
    }

    render(){
        return(
            <div className='control-panel'>
                <div className='wireframe-option-panel'>
                    <Button className='wireframe-option-control-button' id='wireframe-option-control-save' disabled={this.props.save} onClick={this.props.handleSave} >Save</Button>
                    {this.triggerClosingDialog()}
                    <Button className='wireframe-option-control-button' id='wireframe-option-control-zoom-in' onClick={this.props.zoomIn} >
                        <img src={require("../../images/zoom-in.png")} />
                    </Button>
                    <Button className='wireframe-option-control-button' id='wireframe-option-control-zoom-out' onClick={this.props.zoomOut} >
                        <img src={require("../../images/zoom-out.png")} />
                    </Button>
                </div>
                <div className='dimension-control-panel'>
                    <div style={{marginTop:'5px',textAlign:'center', paddingTop:'3%'}} >
                        <a style={{fontSize:'large'}} >Wireframe Dimension</a> 
                    </div>
                    <div className='dimension-input-control'>
                        <div className="input-field" style={{marginTop:'0.5rem'}}>
                            <span>Width:</span>
                            <input className='browser-default right' type="text" name="dimension-width" id="dimension-width" size='10' value={this.state.width} onChange={this.handleWidthChange}/>
                            <div className="red-text right" id="dimension-width-error" style={{fontSize:'',width:'100%'}} hidden={!this.state.widthError} >Invalid width. Enter integer 1-5000</div>
                        </div>
                        <div className="input-field" style={{marginTop:'0.5rem'}}>
                            <span>Height:</span>
                            <input className='browser-default right' type="text" name="dimension-height" id="dimension-height" size='10' value={this.state.height} onChange={this.handleHeightChange} />
                            <div className="red-text right" id="dimension-height-error" style={{fontSize:'',width:'100%'}} hidden={!this.state.heightError} >Invalid height. Enter integer 1-5000</div>
                        </div>
                        
                    </div>
                    <div style={{textAlign:'center'}}>
                        <Button disabled={this.state.disableUdate} onClick={this.handleUpdate} >Update</Button>
                    </div>
                </div>
                <div className='controls-panel'>
                    <div className='controls' onClick={()=>{this.props.addControl('container','',90,50,'#ffffff','#000000',2,2)}} >
                        <div className='white controls-component' style={{position:'relative',width:'90px',height:'50px',border:'solid',borderWidth:'2px'}}></div>
                        <div className='controls-prompt'>container</div>
                    </div>
                    <div className='controls' onClick={()=>{this.props.addControl('label','Prompt for Input',120,20,'unset','#000000',0,0)}}>
                        <div className='controls-component' style={{width:'60%',height:'5%'}} >Prompt for Input:</div>
                        <div className='controls-prompt'>Label</div>
                    </div>
                    <div className='controls' onClick={()=>{this.props.addControl('button','Submit',85,36,'#9dc1e2','#000000',1,1)}}>
                        <Button className='controls-component'>Submit</Button>
                        <br />
                        <div className='controls-prompt'>Button</div>
                    </div>
                    <div className='controls' onClick={()=>{this.props.addControl('textfield','',90,23,'#ffffff','#000000',0,1)}}>
                        <input className='browser-default controls-component' style={{width:'60%',cursor:'pointer'}} type='text' disabled placeholder='Input' />
                        <div className='controls-prompt'>Textfield</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LeftControl;