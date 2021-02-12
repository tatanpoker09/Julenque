import React, { useEffect, useState } from 'react';
import './App.scss';
import Game from './components/Game/Game';
import {useLocation, useParams} from "react-router";
import Lobby from "./components/LanderPage/Lobby";
import NameInput from "./components/Game/NameInput";
import {Client} from "boardgame.io/react";
import {Julenque} from "./lib/JulenqueGame";
import {SocketIO} from "boardgame.io/multiplayer";
import {BOARDGAME_SERVER_PORT} from "./constants_frontend";

function Room() {
    let {game} = useParams();
    let query = useQuery();
    let [started, setStarted] = useState(false);
    const [name, setName] = useState(query.get("name"));


    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    function enterName(nameInput){
        setName(nameInput);
    }
    if(!name){
        return <NameInput enterName={enterName}/>
    } else if(!started){
        return <Lobby handlePlay={()=>setStarted(true)} code={game} name={name}/>
    } else {
        const App = Client({
            game: Julenque,
            numPlayers: 6,
            multiplayer: SocketIO({ server: `localhost:${BOARDGAME_SERVER_PORT}` }),
            board: Game({game, name}),
        });
        return <App/>
    }
}

export default Room;
