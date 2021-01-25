const game_manager = require("../data/game_manager");
const User = require("../data/user");

let io;

function initializeWebsocket() {
    return new Promise((resolve, reject)=>{
    io = require('socket.io')(5000, {
        path: '/backend',
        handlePreflightRequest: (req, res) => {
            const headers = {
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
                "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
                "Access-Control-Allow-Credentials": true
            };
            res.writeHead(200, headers);
            res.end();
        }
    });

    console.log("Initialized socket.io server");

    io.on('connection', function(socket){
        const data = socket.handshake.query;
        const id = socket.id;
        const room_id = data.roomId;
        const name = data.name;
        if(game_manager.games) {
            const game = game_manager.games[room_id];
            if(game) {
                socket.join(room_id);
                const player = new User(name);
                player.setGameID(room_id);
                game.addUser(player);
                console.log(`${data.name} connected to ${data.roomId} with id: ${id}!`);
                io.to(room_id).emit("player-join", name);
            }
        }
    });



    resolve();
    });
}
module.exports = {initializeWebsocket};