const regions = Object.freeze({
    bigIslands: 'bigIslands',
    smallIslands: 'smallIslands',
    forest: 'forest',
    desert: 'desert',
    badlands: 'badlands',
    mountains: 'mountains',
});

const colors = Object.freeze({
    red: 'red',
    blue: 'blue',
    yellow: 'yellow',
    pink: 'pink',
    green: 'green',
    grey: 'grey',
    black: 'black',
});

const locations = Object.freeze({
    outpost: 'outpost',
    farm: 'farm',
    town: 'town',
    feudum: 'feudum',
});

const guilds = Object.freeze({
    farmer: 'farmer',
    merchant: 'merchant',
    alchemist: 'alchemist',
    knight: 'knight',
    noble: 'noble',
    monk: 'monk',
});

const pawns = Object.freeze({
    one: 'pawn1',
    two: 'pawn2',
    three: 'pawn3',
    four: 'pawn4',
    five: 'pawn5',
});

const playerTypes = Object.freeze({
    human: 'human',
    ai: 'ai',
})

export { regions, colors, locations, guilds, pawns, playerTypes }
