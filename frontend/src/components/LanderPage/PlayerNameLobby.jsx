import React from "react";



function PlayerNameLobby({ player }) {



  return(
    <div className={'PlayerName'}>
      <p>{player.name}</p>
      <button className={'Button'}>Expulsar</button>
    </div>
  )
}

export default PlayerNameLobby;