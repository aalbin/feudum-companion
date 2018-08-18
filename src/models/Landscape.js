class Landscape {
    constructor(region, tokens) {
        this.region = region;
        this.tokens = tokens;
    }

    removeTokens() {
        this.tokens = false;
    }

    addTokens() {
        this.tokens = true;
    }
}

export default Landscape;
