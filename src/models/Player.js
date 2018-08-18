import { pawns, locations } from './enums';
import Location from './Location';
import Landscape from './Landscape';
import Influence from './Influence';
import Pawn from './Pawn';

class Player {
    constructor(color) {
        this.color = color;
        this[pawns.one] = new Pawn(null, color);
        this[pawns.two] = new Pawn(null, color);
        this[pawns.three] = new Pawn(null, color);
        this.catapult1 = -3;
        this.catapult2 = -4;
        this.catapult3 = -5;
        this.landscapes = [];
        this.locs = [];
    }

    addLocation(loc) {
        if (!(loc instanceof Location))
            throw new Error('can only add instances of location');

        this.locs.push(loc);
    }

    removeLocation(loc) {
        const index = this.locs.indexOf(loc);
        if (index === -1)
            throw new Error('player does not own location');

            console.log('removing ', index);
        var l = this.locs.splice(index, 1);
        console.log('removed ', l)
    }

    tendLandscape(ls) {
        if (!(ls instanceof Landscape))
            throw new Error('can only add instances of landscape');

        this.landscapes.push(ls);
    }

    loseLandscape(ls) {
        const index = this.landscapes.indexOf(ls);
        if (index === -1)
            throw new Error('player does not own landscape');

        this.landscapes.splice(index, 1);
    }

    getInfluence() {
        return new Influence(this.pawns(), this.locs);
    }

    *pawns() {
        if (this[pawns.one].type)
            yield this.pawn1;
        if (this[pawns.two].type)
            yield this.pawn2;
        if (this[pawns.three].type)
            yield this.pawn3;
    }

    hasFeudum() {
        return this.locs.filter(l => l.type === locations.feudum).length > 0;
    }

    triggerCatapult() {
        if (this.catapult1 !== 0) {
            this.catapult1 = 0;
            return;
        }

        if (this.catapult2 !== 0) {
            this.catapult2 = 0;
            return;
        }

        if (this.catapult3 !== 0) {
            this.catapult3 = 0;
            return;
        }

        // reset to enable cycling, is the idea..
        this.catapult1 = -3;
        this.catapult2 = -4;
        this.catapult3 = -5;
    }
}

export default Player;
