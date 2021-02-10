import React from "react";
import Dice from "./Dice";



function PlayerName({ player }) {



  return(
    <div className={'PlayerName'}>
      <p>{player.name}</p>
      <Dice number={player.health}/>
    </div>
  )
}

export default PlayerName;