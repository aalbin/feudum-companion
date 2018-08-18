import './Player.css';
import React, { Component } from 'react';
import { guilds, locations, regions, pawns } from './models/enums';
import PawnView from './PawnView';
import LocationView from './LocationView';
import LocationAdd from './LocationAdd';
import LandscapeView from './LandscapeView';
// import LandscapeAdd from './LandscapeAdd';
import Location from './models/Location';
import Landscape from './models/Landscape';

class PlayerView extends Component{
    constructor(props) {
        super(props);

        this.state = { player: props.player };
        this.startSelect = props.startSelect;
        this.endSelect = props.endSelect;
        this.addLocation = this.addLocation.bind(this);
        this.addLandscape = this.addLandscape.bind(this);
        this.migratePawn = this.migratePawn.bind(this);
        this.removePawn = this.removePawn.bind(this);
        this.improveLocation = this.improveLocation.bind(this);
        this.removeLocation = this.removeLocation.bind(this);
        this.refreshGuilds = props.refreshGuilds;
    }

    render(){
        return (
            <div className={`player-wrapper player-${this.state.player.color}`}>
                <div className={`player-content`} >
                    {/* <h2>{this.state.player.color}</h2> */}
                    <div>
                        <PawnView pawn={this.state.player.pawn1} nPawn={pawns.one} migratePawn={this.migratePawn} removePawn={this.removePawn} startSelect={this.startSelect} endSelect={this.endSelect} />
                        <PawnView pawn={this.state.player.pawn2} nPawn={pawns.two} migratePawn={this.migratePawn} removePawn={this.removePawn} startSelect={this.startSelect} endSelect={this.endSelect} />
                        <PawnView pawn={this.state.player.pawn3} nPawn={pawns.three} migratePawn={this.migratePawn} removePawn={this.removePawn} startSelect={this.startSelect} endSelect={this.endSelect} />
                    </div>
                    <div className="location-container">
                        {this.renderLocations()}
                        <LocationAdd addLocation={this.addLocation} startSelect={this.startSelect} endSelect={this.endSelect} />
                    </div>
                    {/* rendering issues + UI issues on how to display the landscapes
                        (which landscape to use), how to show landscape has resources,
                        and also how to interact with it - so disable for now */}
                    {/* <div className="landscape-container">
                        {this.renderLandscapes()}
                        <LandscapeAdd addLandscape={this.addLandscape} />
                    </div> */}
                </div>
            </div>
        );
    }

    addLocation(location, region, guild) {
        const player = this.state.player;
        region = Object.values(regions).indexOf(region) >= 0
            ? region
            : regions[Object.keys(regions)[Math.floor(Math.random()*Object.keys(regions).length)]];
        location = Object.values(locations).indexOf(location) >= 0
            ? location 
            : locations[Object.keys(locations)[Math.floor(Math.random()*Object.keys(locations).length)]];
        guild = Object.values(guilds).indexOf(guild) >= 0
            ? guild
            :  location === locations.feudum 
                ? guilds[Object.keys(guilds)[Math.floor(Math.random()*Object.keys(guilds).length)]]
                : undefined;

        const loc = new Location(location, region, guild);
        player.locs.push(loc)

        this.refreshGuilds(player);
        this.setState({ player });
    }

    addLandscape() {
        const player = this.state.player;
        const region = regions[Object.keys(regions)[Math.floor(Math.random()*Object.keys(regions).length)]];
        
        const landscape = new Landscape(region, true);
        player.landscapes.push(landscape)

        this.refreshGuilds(player);
        this.setState({ player });
    }

    renderLocations() {
        const locs = this.state.player.locs.map((l, i) => <LocationView key={l.key} location={l} improveLocation={this.improveLocation} removeLocation={this.removeLocation} startSelect={this.startSelect} endSelect={this.endSelect} />);
        return locs;
    }

    renderLandscapes() {
        const landscapes = this.state.player.landscapes.map(l => <LandscapeView landscape={l} />);
        return landscapes;
    }

    migratePawn(pawn, type) {
        const player = this.state.player;
        type = Object.values(guilds).indexOf(type) >= 0 
            ? type 
            : guilds[Object.keys(guilds)[Math.floor(Math.random()*Object.keys(guilds).length)]];
            
        player[pawn].migrate(type);
        this.refreshGuilds(player);
        this.setState({ player });
        this.endSelect();
    }

    removePawn(pawn) {
        const player = this.state.player;
        player[pawn].remove();
        this.refreshGuilds(player); 
        this.setState({ player });
        this.endSelect();
    }

    improveLocation(key, guild) {
        const player = this.state.player;
        const loc = this.state.player.locs.filter(l => l.key === key)[0];
        loc.improve(guild);
        this.refreshGuilds(player);
        this.setState({ player });
        this.endSelect();
    }

    removeLocation(key) {
        const player = this.state.player;
        const loc = this.state.player.locs.filter(l => l.key === key)[0];
        console.log(key, player.locs, loc);
        player.removeLocation(loc);
        console.log(player.locs);
        this.refreshGuilds(player);
        this.setState({ player });
        this.endSelect();
    }
}

export default PlayerView;
