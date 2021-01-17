const Game = require("./game");

class GameManager{
    constructor() {
        this.games = {}; //Dictionary with format {Game code: Game instance}
    }

    createGame() {
        const game = new Game();
        let generatedId;
        do {
            generatedId = this.generateGameID(4);
        } while (generatedId in game);

        this.games[generatedId] = game;
        return generatedId;
    }


    generateGameID(length) {
        let result           = '';
        const characters       = 'abcdefghijklmnopqrstuvwxyz';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}

module.exports = new GameManager();