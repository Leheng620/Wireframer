import React, { Component } from 'react';
import { Button } from 'react-materialize';

class LeftControl extends Component{

    state = {
        disableUdate: true,
        width: this.props.wireframe.width,
        height: this.props.wireframe.height,
        widthError: false,
        heightError: false
    }

    handleWidthChange = (e) => {
        this.setState({disableUdate: false, width: e.target.value});
    }
    handleHeightChange = (e) =>{
        this.setState({disableUdate: false, height: e.target.value});
    }
    handleUpdate = () => {
        const { width, height } = this.state;
        console.log(typeof width);
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

    render(){
        return(
            <div className='control-panel white'>
                <div className='wireframe-option-panel grey'>
                    <Button className='wireframe-option-control-button' id='wireframe-option-control-save'>Save</Button>
                    <Button className='wireframe-option-control-button' id='wireframe-option-control-close'>close</Button>
                    <Button className='wireframe-option-control-button'>+</Button>
                    <Button className='wireframe-option-control-button'>-</Button>
                </div>
                <div className='dimension-control-panel'>
                    <div style={{marginTop:'5px',textAlign:'center', paddingTop:'3%'}} >
                        <a style={{fontSize:'large'}} >Wireframe Dimension</a> 
                    </div>
                    <div className='dimension-input-control'>
                        <div className="input-field" style={{marginTop:'0.5rem'}}>
                            <span>Width:</span>
                            <input className='browser-default right' type="text" name="dimension-width" id="dimension-width" size='10' value={this.state.width} onChange={this.handleWidthChange}/>
                            <span className="red-text large right" id="dimension-width-error" hidden={!this.state.widthError} >Invalid width. Enter integer 1-5000</span>
                        </div>
                        <div className="input-field" style={{marginTop:'0.5rem'}}>
                            <span>Height:</span>
                            <input className='browser-default right' type="text" name="dimension-height" id="dimension-height" size='10' value={this.state.height} onChange={this.handleHeightChange} />
                            <span className="red-text large right" id="dimension-height-error" hidden={!this.state.heightError} >Invalid height. Enter integer 1-5000</span>
                        </div>
                        
                    </div>
                    <div style={{textAlign:'center'}}>
                        <Button disabled={this.state.disableUdate} onClick={this.handleUpdate} >Update</Button>
                    </div>
                </div>
                <div className='controls-panel'>
                    <div className='controls'>
                        <div className='grey controls-component' style={{position:'relative',width:'40%',height:'50px'}}></div>
                        <div className='controls-prompt'>container</div>
                    </div>
                    <div className='controls'>
                        <div className='controls-component' style={{width:'60%',height:'5%'}} >Prompt for Imput:</div>
                        <div className='controls-prompt'>Label</div>
                    </div>
                    <div className='controls'>
                        <button className='controls-component'>Submit</button>
                        <br />
                        <div className='controls-prompt'>Button</div>
                    </div>
                    <div className='controls'>
                        <input className='browser-default controls-component' style={{width:'60%'}} type='text' placeholder='Input' />
                        <div className='controls-prompt'>Textfield</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LeftControl;