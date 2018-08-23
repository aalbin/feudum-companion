import { locations } from './enums';
import uuid from 'uuidv4';

class Location {
    constructor(type, region, guild) {
        this.type = type;
        this.region = region;
        this.guild = guild;
        this.key = uuid();
    }

    static fromPOCO(poco) {
        const location = new Location(poco.type, poco.region, poco.guild);
        return location;
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
                console.log('"improving" feudum to outpost to simulate conquered feudum');
                this.type = locations.outpost;
                this.guild = null;
                return;
            default:
                console.error('unknown location type');
                return;
        }
    }
}

export default Location;
