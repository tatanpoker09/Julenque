import {Julenque} from "../src/lib/JulenqueGame";

const Server = require('boardgame.io/server').Server;

const lobbyConfig = {
    apiPort: 5000,
    apiCallback: () => console.log('Running Lobby API on port 8080...'),
};

const server = Server({
    games: [Julenque]
});

server.run({port: 5050, lobbyConfig});

