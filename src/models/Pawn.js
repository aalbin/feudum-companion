class Pawn {
    constructor(type, color) {
        this.type = type;
        this.color = color;
    }

    static fromPOCO(poco) {
        const pawn = new Pawn(poco.type, poco.color);
        return pawn;
    }

    migrate(type) {
        this.type = type;
    }

    remove() {
        this.type = null;
    }
}

export default Pawn;
