import React, { Component } from 'react';

class RightControl extends Component{
    

    change = (e) =>{
        let property = e.target.id;
        let value = e.target.value;
        if(property == 'fontSize'){
            if (Number(value) < 0){
                value = this.props.selected.fontSize;
            }
        }
        
        this.props.changeProperties(property, value);
    }

    clickColorPicker(e){
        let id = e.target.id.split('-')[0];
        document.getElementById(id).click();
    }

    render(){
        let selected = this.props.selected;
        let isSelected = selected ? true : false;
        return(
            <div className='control-panel'>
                <div className='property-panel'>
                    <div>
                        <div className='left'>Properties</div>
                        <input id="prop" className='properties-text-field' type='text' disabled={!isSelected} value={isSelected ? selected.prop : ""} onChange={this.change} />
                    </div>
                    <div className='properties'>
                        <span>Font Size:</span>
                        <input id="fontSize" className='properties-text-field' type='number' size='10' 
                            disabled={!isSelected} value={isSelected ? selected.fontSize : ""} onChange={this.change}
                        />
                    </div>

                    <div className='properties'>
                        <span>Text Color:</span>
                        <span id='textColor-span' className='color-picker right' style={{backgroundColor:isSelected ? selected.textColor : "#000000", cursor:'pointer'}} onClick={this.clickColorPicker} ></span>
                        <a className='right' style={{color:isSelected ? selected.textColor : "#000000"}}>{isSelected ? selected.textColor : "#000000"}&nbsp;</a>
                        <input id="textColor" className='right' type='color' hidden disabled={!isSelected} value={isSelected ? selected.textColor : "#000000"} onChange={this.change} />
                    </div>

                    <div className='properties'>
                        <span>Background:</span>
                        <span id='backgroundColor-span' className='color-picker right' style={{backgroundColor:isSelected ? selected.backgroundColor : "#000000", cursor:'pointer'}} onClick={this.clickColorPicker} ></span>
                        <a className='right' style={{color:isSelected ? selected.backgroundColor : "#000000"}}>{isSelected ? selected.backgroundColor : "#000000"}&nbsp;</a>
                        <input id="backgroundColor" className='right' type='color' hidden disabled={!isSelected} value={isSelected ? selected.backgroundColor : "#000000"} onChange={this.change} />
                    </div>

                    <div className='properties'>
                        <span>Border Color:</span>
                        <span id='borderColor-span' className='color-picker right' style={{backgroundColor:isSelected ? selected.borderColor : "#000000", cursor:'pointer'}} onClick={this.clickColorPicker} ></span>
                        <a className='right' style={{color:isSelected ? selected.borderColor : "#000000"}}>{isSelected ? selected.borderColor : "#000000"}&nbsp;</a>
                        <input id="borderColor" className='right' type='color' hidden disabled={!isSelected} value={isSelected ? selected.borderColor : "#000000"} onChange={this.change} />
                    </div>

                    <div className='properties'>
                        <span>Border Thickness:</span>
                        <input id="borderThickness" className='properties-text-field' type='range' min='0' max={isSelected? selected.height/2 : 0} disabled={!isSelected} value={isSelected ? selected.borderThickness : ""} onChange={this.change} />
                    </div>
                    <div className='properties'>
                        <span>Border Radius:</span>
                        <input id="borderRadius" className='properties-text-field' type='range' min='0' max={isSelected? selected.height/2 : 0} disabled={!isSelected} value={isSelected ? selected.borderRadius : ""} onChange={this.change} />
                    </div>
                </div>
            </div>
        )
    }
}

export default RightControl;