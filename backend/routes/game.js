const game_manager = require("../data/game_manager");
const User = require("../data/user");
var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/create', function(req, res, next) {
    const game_code = game_manager.createGame();
    console.log("Generated game code: ", game_code);
    res.status(200).send(game_code);
});

function loadGame(req, res, next){
    const game_id = req.params.gameid;
    req.game = game_manager.games[game_id];
    if(!req.game){
        res.status(404).send("Game not found");
    } else {
        next();
    }
}

router.post("/:gameid/start_game", loadGame, function (req, res,next){
    const game = req.game;
    game.startNewRound();
});




router.post("/:gameid/join", loadGame, function(req, res, next){
    const game = req.game;
    const name = req.body.name;
    if(game) {
        const player = new User(name);
        player.setGameID(game.game_id);
        game.addUser(player);
        res.status(200).send("OK");
    } else {
        res.status(404).send("Game not found");
    }
});

router.get("/:gameid/players", loadGame, function(req, res, next){
    const game = req.game;
    if(game) {
        const players = game.users;
        res.status(200).send(players);
    } else {
        res.status(404).send("Game not found");
    }
});

module.exports = router;
