import React from "react";
import PlayerNameLobby from "./PlayerNameLobby";

function Lobby({ handleCancel, players, setPlayers, handlePlay, code}) {

  return(
    <div>
      <p>Código:</p>
      <h1>{code}</h1>
      <div className={'playerList'}>
        {players.map((player, index) =>
          <PlayerNameLobby player={player} id={index}/>
        )}
      </div>
      <button className={'button landerButton'} onClick={handlePlay}>Iniciar Juego</button>
      <button className={'button landerButton'} onClick={handleCancel}>Salir</button>
    </div>
  );
}

export default Lobby;