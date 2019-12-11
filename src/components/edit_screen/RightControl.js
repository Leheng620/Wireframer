import React, { Component } from 'react';

class RightControl extends Component{
    render(){
        return(
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
        )
    }
}

export default RightControl;