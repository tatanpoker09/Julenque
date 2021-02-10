import Room from "../../App";
import {SocketIO} from "boardgame.io/multiplayer";
import {Client} from "boardgame.io/react";
import {Julenque} from "../../lib/JulenqueGame";

const JulenqueClient = Client({
    game: Julenque,
    numPlayers: 6,
    multiplayer: SocketIO({ server: 'localhost:5050' }),
    board: Room,
});

export default JulenqueClient;
