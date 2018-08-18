import './Landscape.css';
import React, { Component } from 'react';

class LandscapeAdd extends Component{
    constructor(props) {
        super(props);

        this.addLandscape = props.addLandscape;
    }

    render(){
        return (
            <div className={`landscape-wrapper landscape-add`} onClick={this.addLandscape}>
            </div>
        );
    }
}

export default LandscapeAdd;
