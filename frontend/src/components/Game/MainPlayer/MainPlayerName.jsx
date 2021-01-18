import React from "react";
import Dice from "../Dice";



function MainPlayerName({ player }) {



  return(
    <div className={'mainPlayerName'}>
      <p>{player.name}</p>
      <Dice number={player.life}/>
    </div>
  )
}

export default MainPlayerName;