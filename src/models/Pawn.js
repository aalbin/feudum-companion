class Pawn {
    constructor(type, color) {
        this.type = type;
        this.color = color;
    }

    migrate(type) {
        this.type = type;
    }

    remove() {
        this.type = null;
    }
}

export default Pawn;
