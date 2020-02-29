import { pawns, locations, playerTypes, colors } from './enums';
import Location from './Location';
import Landscape from './Landscape';
import Influence from './Influence';
import Pawn from './Pawn';

class Player {
    constructor(color, playerType) {
        this.playerType = playerType;
        this.color = color;
        this[pawns.one] = new Pawn(null, playerType === playerTypes.ai ? colors.green : color);
        this[pawns.two] = new Pawn(null, playerType === playerTypes.ai ? colors.green : color);
        this[pawns.three] = new Pawn(null, playerType === playerTypes.ai ? colors.green : color);
        if(playerType === playerTypes.ai) {
            this[pawns.four] = new Pawn(null, color);
            this[pawns.five] = new Pawn(null, color);
        }
        this.catapult1 = -3;
        this.catapult2 = -4;
        this.catapult3 = -5;
        this.landscapes = [];
        this.locs = [];
    }
    
    static fromPOCO(poco) {
        const player = new Player(poco.color, poco.playerType);
        player[pawns.one] = Pawn.fromPOCO(poco[pawns.one]);
        player[pawns.two] = Pawn.fromPOCO(poco[pawns.two]);
        player[pawns.three] = Pawn.fromPOCO(poco[pawns.three]);
        if(poco.playerType === playerTypes.ai) {
            player[pawns.four] = Pawn.fromPOCO(poco[pawns.four]);
            player[pawns.five] = Pawn.fromPOCO(poco[pawns.five]);
        }
        player.catapult1 = poco.catapult1;
        player.catapult2 = poco.catapult2;
        player.catapult3 = poco.catapult3;
        player.landscapes = poco.landscapes.map(l => Landscape.fromPOCO(l));
        player.locs = poco.locs.map(l => Location.fromPOCO(l));
        return player;
    }

    addLocation(loc) {
        if (!(loc instanceof Location))
            throw new Error('can only add instances of location');

        this.locs.push(loc);
    }

    removeLocation(key) {
        const loc = this.locs.filter(l => l.key === key);
        const index = loc.length === 1 ? this.locs.indexOf(loc[0]) : -1;
        if (index === -1)
            throw new Error('player does not own location');

        var l = this.locs.splice(index, 1);
        return l.length > 0 ? l[0] : null;
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
        if (this[pawns.four].type)
            yield this.pawn4;
        if (this[pawns.five].type)
            yield this.pawn5;
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
