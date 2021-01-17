import React from "react";



function PlayerNameLobby({ player }) {



  return(
    <div className={'playerName'}>
      <p>{player.name}</p>
      <button className={'button'}>Expulsar</button>
    </div>
  )
}

export default PlayerNameLobby;