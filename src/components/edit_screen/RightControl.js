import React, { Component } from 'react';

class RightControl extends Component{
    render(){
        const selected = this.props.selected;
        const isSelected = selected ? true : false;
        return(
            <div className='control-panel white'>
                <div className='property-panel'>
                    <div>
                        <div className='left'>Properties</div>
                        <input className='browser-default' type='text' disabled readOnly value={isSelected ? selected.type : ""} />
                    </div>
                    <div className='properties'>
                        <span>Font Size:</span>
                        <input className='browser-default right' type='text' id='font-size' size='10' value={isSelected ? selected.fontSize : ""} />
                    </div>
                    <div className='properties'>
                        <span>Text Color:</span>
                        <input className='right' type='color' value={isSelected ? selected.textColor : "#000000"} />
                    </div>
                    <div className='properties'>
                        <span>Background:</span>
                        <input className='right' type='color' value={isSelected ? selected.backgroundColor : "#000000"} />
                    </div>
                    <div className='properties'>
                        <span>Border Color:</span>
                        <input className='right' type='color' value={isSelected ? selected.borderColor : "#000000"} />
                    </div>
                    <div className='properties'>
                        <span>Border Thickness:</span>
                        <input className='browser-default right' type='text' id='font-size' size='4' value={isSelected ? selected.borderThickness : ""} />
                    </div>
                    <div className='properties'>
                        <span>Border Radius:</span>
                        <input className='browser-default right' type='text' id='font-size' size='4' value={isSelected ? selected.borderRadius : ""} />
                    </div>
                </div>
            </div>
        )
    }
}

export default RightControl;