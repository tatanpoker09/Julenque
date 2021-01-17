const game_manager = require("../data/game_manager");

var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/create', function(req, res, next) {
    const game_code = game_manager.createGame();
    console.log("Generated game code: ", game_code);
    res.status(200).send(game_code);
});

router.post("/:gameid/start_game", function (req, res,next){
    const game_id = req.params.gameid;
    const game = game_manager.games[game_id];
    game.startNewRound();
});



module.exports = router;
