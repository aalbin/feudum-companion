import './Location.css';
import React, { Component } from 'react';
import { locations, regions, guilds } from './models/enums';

class LocationAdd extends Component{
    constructor(props) {
        super(props);

        this.state = { location: null, region: null, guild: null, selecting: false }

        this.addLocation = props.addLocation;
        this.startSelect = props.startSelect;
        this.endSelect = props.endSelect;

        this.selectLocation = this.selectLocation.bind(this);
        this.selectRegion = this.selectRegion.bind(this);
        this.renderSelectItems = this.renderSelectItems.bind(this);
    }

    render(){
        return (
            <div className="location-wrapper location-add" disabled={this.state.selecting} onClick={() => this.startSelect(this.renderSelectItems)}>
            </div>
        );
    }

    getActiveState(lr, g) {
        if(this.state.region === lr || (this.state.location === lr && this.state.guild === g))
            return 'location-select-item-selected';
        return '';
    }

    selectLocation(l, g) {
        if(this.state.region) {
            this.addLocation(l, this.state.region, g);
            this.setState({ region: null, selecting: false });
            this.endSelect();
        } else {
            const location = l;
            const guild = g;
            this.setState({ location, guild });
        }
    }

    selectRegion(r) {
        if(this.state.location) {
            this.addLocation(this.state.location, r, this.state.guild);
            this.setState({ location: null, guild: null, selecting: false });
            this.endSelect();
        } else {
            const region = r;
            this.setState({ region });
        }
    }

    renderSelectItems() {
        return <div>
            <button className={`location-select-item location-outpost ${this.getActiveState(locations.outpost)}`} onClick={() => this.selectLocation(locations.outpost)}></button>
            <button className={`location-select-item location-farm ${this.getActiveState(locations.farm)}`} onClick={() => this.selectLocation(locations.farm)}></button>
            <button className={`location-select-item location-town ${this.getActiveState(locations.town)}`} onClick={() => this.selectLocation(locations.town)}></button>
            <button className={`location-select-item location-feudum-farmer ${this.getActiveState(locations.feudum, guilds.farmer)}`} onClick={() => this.selectLocation(locations.feudum, guilds.farmer)}></button>
            <button className={`location-select-item location-feudum-merchant ${this.getActiveState(locations.feudum, guilds.merchant)}`} onClick={() => this.selectLocation(locations.feudum, guilds.merchant)}></button>
            <button className={`location-select-item location-feudum-alchemist ${this.getActiveState(locations.feudum, guilds.alchemist)}`} onClick={() => this.selectLocation(locations.feudum, guilds.alchemist)}></button>
            <button className={`location-select-item location-feudum-knight ${this.getActiveState(locations.feudum, guilds.knight)}`} onClick={() => this.selectLocation(locations.feudum, guilds.knight)}></button>
            <button className={`location-select-item location-feudum-noble ${this.getActiveState(locations.feudum, guilds.noble)}`} onClick={() => this.selectLocation(locations.feudum, guilds.noble)}></button>
            <button className={`location-select-item location-feudum-monk ${this.getActiveState(locations.feudum, guilds.monk)}`} onClick={() => this.selectLocation(locations.feudum, guilds.monk)}></button>
            <br/>
            <button className={`location-select-item region-select-bigIslands ${this.getActiveState(regions.bigIslands)}`} onClick={() => this.selectRegion(regions.bigIslands)}></button>
            <button className={`location-select-item region-select-smallIslands ${this.getActiveState(regions.smallIslands)}`} onClick={() => this.selectRegion(regions.smallIslands)}></button>
            <button className={`location-select-item region-select-forest ${this.getActiveState(regions.forest)}`} onClick={() => this.selectRegion(regions.forest)}></button>
            <button className={`location-select-item region-select-desert ${this.getActiveState(regions.desert)}`} onClick={() => this.selectRegion(regions.desert)}></button>
            <button className={`location-select-item region-select-badlands ${this.getActiveState(regions.badlands)}`} onClick={() => this.selectRegion(regions.badlands)}></button>
            <button className={`location-select-item region-select-mountains ${this.getActiveState(regions.mountains)}`} onClick={() => this.selectRegion(regions.mountains)}></button>
        </div>
    }
}

export default LocationAdd;
