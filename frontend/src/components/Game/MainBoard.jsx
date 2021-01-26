import React from "react";
import Dice from "./Dice";




function MainBoard({ players }) {
  return(
    <div className={'MainBoard'}>
      {players.map((player, i) => {
            return (<div key={i+player.dices.dice1+player.dices.dice2} className={'PlayerDices'}>
              <Dice number={player.dices.dice1} refresh={player.dices}/>
              <Dice number={player.dices.dice2} refresh={player.dices} />
            </div>)
          }
      )}
    </div>
  )
}

export default MainBoard;