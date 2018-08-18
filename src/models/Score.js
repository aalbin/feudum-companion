class Score {
    constructor(player, guilds, epoch) {
        this.guilds = guilds
            .reduce((val, g) => val + g.getPoints(player.color), 0);

        this.landscapes = player.landscapes
            .reduce((val, l) => val + (l.tokens ? 4 : 2), 0);

        this.regions = player.locs
            .map(l => l.region)
            .filter((value, index, self) => self.indexOf(value) === index) * 2 - 1;

        this.penalty = this.getPenalty(epoch, player);
    }

    getTotal() {
        return this.guilds + this.landscapes + this.regions + this.penalty;
    }

    getPenalty(epoch, player) {
        if (!player.hasFeudum())
            return 0;

        // catapults are either 0, if token has been placed on them, or the penalty associated with that catapult spot on the board if not (for example -3 on catapult1)
        if (epoch === 2) {
            return player.catapult1;
        }

        if (epoch === 4) {
            return player.catapult2 + player.catapult1;
        }

        if (epoch === 5) {
            return player.catapult3 + player.catapult2 + player.catapult1;
        }

        return 0;
    }
}

export default Score;
