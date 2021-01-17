import React from "react";
import PlayerNameLobby from "./PlayerNameLobby";

function Lobby({ handleCancel, players, setPlayers, handlePlay, code}) {

  return(
    <div>
      <p>Código:</p>
      <h1>{code}</h1>
      <div className={'PlayerList'}>
        {players.map((player, index) =>
          <PlayerNameLobby player={player} id={index}/>
        )}
      </div>
      <button className={'Button LanderButton'} onClick={handlePlay}>Iniciar Juego</button>
      <button className={'Button LanderButton'} onClick={handleCancel}>Salir</button>
    </div>
  );
}

export default Lobby;