import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { Button } from 'react-materialize';


class EditScreen extends Component{
    render(){
        if(!this.props.wireframe){
            return <React.Fragment/>;
        }
        return(
            <div className='edit-screen-container'>
                <div className='wireframe-container'>
                    <div className='control-panel white'>
                        <div className='wireframe-option-panel grey'>
                            <Button className='wireframe-option-control-button'>Save</Button>
                            <Button className='wireframe-option-control-button'>close</Button>
                            <Button className='wireframe-option-control-button'>+</Button>
                            <Button className='wireframe-option-control-button'>-</Button>
                        </div>
                        <div className='dimension-control-panel'>
                            <div style={{marginTop:'5px',textAlign:'center', paddingTop:'3%'}} >
                               <a style={{fontSize:'large'}} >Wireframe Dimension</a> 
                            </div>
                            <div className='dimension-input-control'>
                                <div className="input-field">
                                    <input className='browser-default' type="text" name="dimension-width" id="dimension-width" placeholder="Height" size='4' />
                                    <span className="left red-text large" id="dimension-width-error"></span>
                                </div>
                                <div className="input-field">
                                    <input className='browser-default' type="text" name="dimension-height" id="dimension-height" placeholder="width" size='4' />
                                    <span className="left red-text large" id="dimension-height-error"></span>
                                </div>
                                <div>
                                    <Button>Update</Button>
                                </div>
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

                    <div className='wireframe-panel control-panel white'>
                        <div style={{textAlign:'center'}}>
                            <h4>Work Place</h4>
                        </div>
                        <div id='work-place'>

                        </div>
                    </div>

                    <div className='control-panel white'>
                        <div className='property-panel'>
                            <div>
                                <div className='left'>Properties</div>
                                <input className='browser-default' type='text' />
                            </div>
                            <div className='properties'>
                                <span>Font Size:</span>
                                <input className='browser-default right' type='text' id='font-size' size='10' />
                            </div>
                            <div className='properties'>
                                <span>Background:</span>
                                <input className='right' type='color' />
                            </div>
                            <div className='properties'>
                                <span>Border Color:</span>
                                <input className='right' type='color' />
                            </div>
                            <div className='properties'>
                                <span>Border Thickness:</span>
                                <input className='browser-default right' type='text' id='font-size' size='4' />
                            </div>
                            <div className='properties'>
                                <span>Border Radius:</span>
                                <input className='browser-default right' type='text' id='font-size' size='4' />
                            </div>
                        </div>
                    </div>
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