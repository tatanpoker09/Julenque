import {Julenque} from "../src/lib/JulenqueGame";
import {LOBBY_API_PORT} from "../constants";

const Server = require('boardgame.io/server').Server;

const lobbyConfig = {
    apiPort: LOBBY_API_PORT,
    apiCallback: () => console.log(`Running Lobby API on port ${LOBBY_API_PORT}...`),
};

const server = Server({
    games: [Julenque]
});

server.run({port: 5377, lobbyConfig});

