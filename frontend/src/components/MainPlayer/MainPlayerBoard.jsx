import React from "react";
import Dice from "../Dice";


function MainPlayerBoard({dices}) {



  return(
    <div className={'MainPlayerBoard'}>
      <Dice number={dices.dice1}/>
      <Dice number={dices.dice2}/>
    </div>
  )
}

export default MainPlayerBoard;