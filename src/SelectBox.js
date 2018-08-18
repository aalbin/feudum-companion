import './SelectBox.css';
import React, { Component } from 'react';

class SelectBox extends Component{
    constructor(props) {
        super(props);

        this.selectBox = props.selectBox;
        this.endSelect = props.endSelect;
        this.deselect = this.deselect.bind(this);
        this.renderInside = this.renderInside.bind(this);
    }

    render(){
        return (
            <div className={`select-box-wrapper ${this.selectBox.hidden ? 'select-box-hidden' : ''}`} onClick={this.deselect}>
                <div className="select-box" onClick={(e) => e.stopPropagation()}>
                    {this.renderInside()}
                </div>
            </div>
        );
    }

    renderInside() {
        if(this.selectBox.render) {
            return <div>{this.selectBox.render()}</div>
        }
        return;
    }

    deselect() {
        this.endSelect();
    }
}

export default SelectBox;
