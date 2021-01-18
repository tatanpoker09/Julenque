import React, { useState }from "react";
import MainPlayerBoard from "./MainPlayerBoard";
import MainPlayerOptions from "./MainPlayerOptions";
import ValueSelector from "./ValueSelector";
import MainPlayerName from "./MainPlayerName";


const player = {name: 'Lucas', life: 5, dices: {dice1: 4, dice2: 4}}

function MainPlayer() {
  const [betValue, setBetValue] = useState(1)


  return(
    <>
      <div className={'mainPlayer'}>
        <ValueSelector betValue={betValue} setBetValue={setBetValue} />
        <MainPlayerBoard dices={player.dices}/>
        <MainPlayerOptions/>
      </div>
    </>
  )
}

export default MainPlayer;