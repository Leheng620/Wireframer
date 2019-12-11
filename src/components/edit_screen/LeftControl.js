import React, { Component } from 'react';
import { Button } from 'react-materialize';

class LeftControl extends Component{
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
                            <input className='browser-default right' type="text" name="dimension-width" id="dimension-width" size='10' />
                            <span className="left red-text large" id="dimension-width-error"></span>
                        </div>
                        <div className="input-field" style={{marginTop:'0.5rem'}}>
                            <span>Heigth:</span>
                            <input className='browser-default right' type="text" name="dimension-height" id="dimension-height" size='10' />
                            <span className="left red-text large" id="dimension-height-error"></span>
                        </div>
                        
                    </div>
                    <div style={{textAlign:'center'}}>
                        <Button>Update</Button>
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