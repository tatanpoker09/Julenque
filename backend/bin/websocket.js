import { LobbyClient } from 'boardgame.io/client';

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
                if (game.status==="LOBBY") { //If we're still in the lobby basically
                    socket.join(room_id);
                    const player = new User(name);
                    socket.player = player;
                    player.setGameID(room_id);
                    game.addUser(player);
                    console.log(`${data.name} connected to ${data.roomId} with id: ${id}!`);
                    io.to(room_id).emit("player-join", name);
                } else if(game.status==="STARTING") {
                    console.log(`${data.name} connected to ${data.roomId} on game starting!`);
                    game.userConnected(name, socket);
                }
            }
        }

        socket.on("disconnect", (reason)=>{
            console.log(`User ${name} disconnected!`);
            const game = game_manager.games[room_id];
            if(game) {
                game.users.forEach((player)=>player.name===name?player.connected=false:null);
                //game.users.filter((player) => player.name !== name);
                io.to(room_id).emit("player-leave", name);
            }
        });

        socket.on('request-private-data', function(){
            socket.user.sendPrivateData();
        });


        socket.on('game-start', async function(socket){
            console.log('received game-start! Will re-send');
            //We add everyone onto a room.


            const lobbyClient = new LobbyClient({ server: 'http://localhost:8080' });
            const {matchID} = await lobbyClient.createMatch('Julenque', {numPlayers: game_manager.games[room_id].users.length});

            game_manager.games[room_id].setStatus("STARTING");
            io.to(room_id).emit("game-start", {matchID: matchID});
        });
    });



    resolve();
    });
}
module.exports = {initializeWebsocket};
