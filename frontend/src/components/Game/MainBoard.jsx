import React from "react";
import Dice from "./Dice";




function MainBoard({ players }) {

  return(
    <div className={'mainBoard'}>
      {players.map((player, i) =>
        <div key={i} className={'playerDices'}>
          <Dice number={player.dices.dice1}/>
          <Dice number={player.dices.dice2}/>
        </div>
      )}
    </div>
  )
}

export default MainBoard;