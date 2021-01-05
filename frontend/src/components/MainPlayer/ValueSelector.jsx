import React, { useState } from "react";
import Arrow from '../../assets/Arrow.svg';


const betValues = {
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9',
  10: '10',
  11: '11',
  12: '12',
  13: '1-1',
  14: '2-2',
  15: '3-3',
  16: '4-4',
  17: '5-5',
  18: '6-6',

}
function ValueSelector({betValue, setBetValue}) {

  const handleArrow = (up) => {
    if (up && betValue < 18) {
      setBetValue(betValue + 1);
    } else if (!up && betValue > 1) {
      setBetValue(betValue - 1);
    }
  }


  return(
    <div className={'Padding-10 HorizontalFlex'}>
      <div className={'ValueSelector Padding-10 VerticalFlex'} >
        <img className={'Arrow'} onClick={() => handleArrow(true)} src={Arrow}/>
        <div className={'Value'}> <p>{betValues[betValue]}</p> </div>
        <img className={'Arrow DownArrow'} onClick={() => handleArrow(false)} src={Arrow}/>
      </div>
      <div className={'Padding-10 VerticalFlex'}>
        <button className={'Button Play'}>Ok</button>
        <button className={'Button Play'}>Dudo</button>
      </div>
    </div>

  )
}

export default ValueSelector;