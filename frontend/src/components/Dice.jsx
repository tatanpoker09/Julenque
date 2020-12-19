import React from "react";
import Dado1 from '../assets/Dado1.png';
import Dado2 from '../assets/Dado2.png';
import Dado3 from '../assets/Dado3.png';
import Dado4 from '../assets/Dado4.png';
import Dado5 from '../assets/Dado5.png';
import Dado6 from '../assets/Dado6.png';
import DadoNull from '../assets/DadoNull.png'

const dices = {
  1: Dado1,
  2: Dado2,
  3: Dado3,
  4: Dado4,
  5: Dado5,
  6: Dado6,
  null: DadoNull,
}

function Dice({number}) {



  return(
    <div className={'GameDice'}>
      <img className={'GameDiceImage'} src={dices[number]}/>
    </div>
  )
}

export default Dice;