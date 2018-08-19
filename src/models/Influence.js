import { guilds, locations } from './enums';

class Influence {
    constructor(pawns, locs) {
        this[guilds.farmer] = 0;
        this[guilds.merchant] = 0;
        this[guilds.alchemist] = 0;
        this[guilds.knight] = 0;
        this[guilds.noble] = 0;
        this[guilds.monk] = 0;

        this.secondary = {};
        this.secondary[guilds.farmer] = 0;
        this.secondary[guilds.merchant] = 0;
        this.secondary[guilds.alchemist] = 0;
        this.secondary[guilds.knight] = 0;
        this.secondary[guilds.noble] = 0;
        this.secondary[guilds.monk] = 0;

        for (let pawn of pawns) {
            this[pawn.type] += 1;
        }

        for (let feudum of locs.filter(l => l.type === locations.feudum)) {
            this[feudum.guild] += 3;
        }

        for (let l of locs.filter(l => l.type !== locations.feudum)) {
            switch (l.type) {
                case locations.outpost:
                    this.secondary[guilds.alchemist] += 1;
                    this.secondary[guilds.monk] += 1;

                    if (this[guilds.alchemist] > 0)
                        this[guilds.alchemist] += 1;
                    if (this[guilds.monk] > 0)
                        this[guilds.monk] += 1;
                    break;

                case locations.farm:
                    this.secondary[guilds.farmer] += 1;
                    this.secondary[guilds.knight] += 1;
                    
                    if (this[guilds.farmer] > 0)
                        this[guilds.farmer] += 1;
                    if (this[guilds.knight] > 0)
                        this[guilds.knight] += 1;
                    break;

                case locations.town:
                this.secondary[guilds.merchant] += 1;
                this.secondary[guilds.noble] += 1;
                
                    if (this[guilds.merchant] > 0)
                        this[guilds.merchant] += 1;
                    if (this[guilds.noble] > 0)
                        this[guilds.noble] += 1;
                    break;

                default:
                    break;
            }
        }
    }
}

export default Influence;
