import './Location.css';
import React, { Component } from 'react';
import { locations, guilds } from './models/enums';

class LocationView extends Component{
    constructor(props) {
        super(props);

        this.location = props.location;
        this.startSelect = props.startSelect;
        this.endSelect = props.endSelect;
        this.improveLocation = props.improveLocation;
        this.removeLocation = props.removeLocation;

        this.renderImprove = this.renderImprove.bind(this);
        this.dragLocation = this.dragLocation.bind(this);
    }

    render(){
        return (
            <div className={`location-wrapper location-instance-wrapper location-${this.location.region}`} onClick={() => this.startSelect(this.renderImprove)} draggable="true" onDragStart={this.dragLocation}>
                <div className={`location-content ${this.getLocationClass(this.location.type, this.location.guild)}`} >
                </div>
            </div>
        );
    }

    getLocationClass(location, guild) {
        let cls = `location-${location}`;
        if(location === locations.feudum)
            cls += `-${guild}`;
        return cls;
    }

    renderImprove() {
        return (
            <div>
                {this.renderUpgradeOptions()}
                <button onClick={() => this.removeLocation(this.location.key)}>remove location</button>
            </div>
        )
    }

    renderUpgradeOptions() {
        switch(this.location.type){
            case locations.outpost: 
                return (
                    <div className={`location-select-wrapper`} onClick={() => this.improveLocation(this.location.key)}>
                        <div className={`location-content ${this.getLocationClass(locations.farm)}`}></div>
                    </div>
                )
                
            case locations.farm:
                return (
                    <div className={`location-select-wrapper`} onClick={() => this.improveLocation(this.location.key)}>
                        <div className={`location-content ${this.getLocationClass(locations.town)}`}></div>
                    </div>
                )

            case locations.town:
                return Object.keys(guilds).map((g, i) => <div key={i} className={`location-select-wrapper`} onClick={() => this.improveLocation(this.location.key, guilds[g])}>
                    <div className={`location-content ${this.getLocationClass(locations.feudum, guilds[g])}`}></div>
                </div>);

            case locations.feudum:
            return (
                <div className={`location-select-wrapper`} onClick={() => this.improveLocation(this.location.key)}>
                    <div className={`location-content ${this.getLocationClass(locations.outpost)}`}></div>
                </div>
            )
        }
    }

    dragLocation(e) {
        console.log(this, e);
        e.dataTransfer.setData('key', this.location.key);
    }
}

export default LocationView;
