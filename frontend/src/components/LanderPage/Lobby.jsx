import React from "react";
import PlayerNameLobby from "./PlayerNameLobby";
import {useLobby} from "../../services/websocketService";

function Lobby({ handleCancel, handlePlay, code, name}) {
    const {players} = useLobby(code, name);



    if(players.length>0){
        return(
            <div>
                <p>Código:</p>
                <h1>{code}</h1>
                <div className={'PlayerList'}>
                    {players.map((player, index) =>
                        <PlayerNameLobby player={player}  key={player.name} id={index}/>
                    )}
                </div>
                
                <button className={'Button LanderButton'} onClick={handlePlay}>Iniciar Juego</button>
                <button className={'Button LanderButton'} onClick={handleCancel}>Salir</button>
            </div>
        );
    } else {
        //loadPlayers();
        return <div>Loading players...</div>
    }
}

export default Lobby;