import { locations } from './enums';
import uuid from 'uuidv4';

class Location {
    constructor(type, region, guild) {
        this.type = type;
        this.region = region;
        this.guild = guild;
        this.key = uuid();
    }

    improve(guild) {

        // using epoch and region, return the points received for this upgrade and display it?
        switch (this.type) {
            case locations.outpost:
                this.type = locations.farm;
                return;
            case locations.farm:
                this.type = locations.town;
                return;
            case locations.town:
                this.type = locations.feudum;
                this.guild = guild;
                return;
            case locations.feudum:
                console.error('cannot improve feudum');
                return;
            default:
                console.error('unknown location type');
                return;
        }
    }
}

export default Location;
