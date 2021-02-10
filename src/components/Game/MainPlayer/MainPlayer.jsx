import React, { useState }from "react";
import MainPlayerBoard from "./MainPlayerBoard";
import MainPlayerOptions from "./MainPlayerOptions";
import ValueSelector from "./ValueSelector";
import MainPlayerName from "./MainPlayerName";



function MainPlayer({player}) {
  const [betValue, setBetValue] = useState(1);

return(
    <>
      <div className={'MainPlayer'}>
        <ValueSelector betValue={betValue} setBetValue={setBetValue} />
        <MainPlayerBoard dices={player.dices} key={player.dices}/>
        <MainPlayerOptions/>
      </div>
    </>
  )
}

export default MainPlayer;