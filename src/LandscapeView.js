import './Landscape.css';
import React, { Component } from 'react';

class LandscapeView extends Component{
    constructor(props) {
        super(props);

        this.landscape = props.landscape;
    }

    render(){
        return (
            <div className={`landscape-wrapper`}>
                <div className={`landscape-content landscape-${this.landscape.region}`} >
                </div>
            </div>
        );
    }
}

export default LandscapeView;
