import { colors } from './enums';

class Guild {
    constructor(g) {
        this.guild = g;
        this.influence = {};
        this.position = [null, null, null, null, null, null];

        this.influence[colors.red] = 0;
        this.influence[colors.blue] = 0;
        this.influence[colors.yellow] = 0;
        this.influence[colors.pink] = 0;
        this.influence[colors.green] = 0;
        this.influence[colors.grey] = 0;
    }

    // color should be a value from the colors enum
    // newInfluence should be an instance of the influence class
    // statusQuo is a special card action from the alter ego expansion that can be played with the migrate action, which allows a player to move past another player simply by tieing them 
    setInfluence(color, newInfluence, statusQuo) {
        // early exit if influence hasn't changed. depending on how this function will be used this may save some cpu cycles
        if (this.influence[color] === newInfluence[this.guild])
            return;

        const currentPosition = this.position.indexOf(color);
        const currentInfluence = this.influence[color];
        const higher = newInfluence[this.guild] > currentInfluence;
        const lower = newInfluence[this.guild] < currentInfluence;
        this.influence[color] = newInfluence[this.guild];

        if (higher) {
            // loop upwards from current position, or 0 if not in any
            // if position is undefined or color in position has lower influence (or if statusQuo is true and influence is tied), 
            // continue to next while switching current and previous positions (moving your color up one step)
            // else break 

            for (let i = currentPosition >= 0 ? currentPosition + 1 : 0; i < this.position.length; i++) {
                if (!this.position[i] 
                    || (!statusQuo && this.influence[this.position[i]] < this.influence[color]) 
                    || (statusQuo && this.influence[this.position[i]] <= this.influence[color])) {
                    if (i === 0)
                        this.position[i] = color;

                    else {
                        this.position[i - 1] = this.position[i];
                        this.position[i] = color;   // should be right seeing as I'm only moving color up the ladder here
                    }
                }
                else
                    break;
            }
        }

        else if (lower) {
            for (let i = currentPosition - 1; i >= 0; i--) {
                if (this.influence[color] < this.influence[this.position[i]]) {
                    this.position[i + 1] = this.position[i];
                    this.position[i] = color;
                }
                else
                    break;
            }
        }
    }

    master() {
        return this.getPosition(5);
    }

    journeyman() {
        return this.getPosition(4);
    }

    apprentice() {
        return this.getPosition(3);
    }

    getPosition(position) {
        return this.position[position] 
            ? this.position[position] 
            : 'none';
    }

    getInfluence(color) {
        return this.influence[color];
    }

    getPoints(color) {
        if (this.master() === color)
            return 5;

        if (this.journeyman() === color)
            return 3;

        if (this.apprentice() === color)
            return 1;

        return 0;
    }
}

export default Guild;
