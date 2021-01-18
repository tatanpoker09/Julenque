import React, { useEffect } from "react";
import Arrow from '../../../assets/Arrow.svg';
import { BET_VALUES, MIN_VALUE, MID_VALUE, MAX_VALUE } from '../../../config/betValues.json';


function ValueSelector({betValue, setBetValue}) {

  const handleArrow = (up) => {
    if (up && betValue < MAX_VALUE) {
      setBetValue(betValue + 1);
    } else if (!up && betValue > MIN_VALUE) {
      setBetValue(betValue - 1);
    }
  }

  useEffect(() => {
    const keyFunction = (event) => {
      event.preventDefault();
      switch(event.key) {
        case 'w':
        case 'ArrowUp':
          document.getElementById("UpArrow").click();
          break;
        case 's':
        case 'ArrowDown':
          document.getElementById("downArrow").click();
          break;
        case 'a':
        case 'ArrowLeft':
          if (betValue > MID_VALUE) {
            setBetValue(MID_VALUE);
          } else {
            setBetValue(MIN_VALUE);
          }
          break;
        case 'd':
        case 'ArrowRight':
          if (betValue < MID_VALUE) {
            setBetValue(MID_VALUE);
          } else {
            setBetValue(MAX_VALUE);
          }
          break;
        case 'Enter':
          document.getElementById("OkButton").click();
          break;
        default:
          break;
      }
    };
    document.addEventListener("keyup", keyFunction);
    return () => {
      document.removeEventListener("keyup", keyFunction);
    };
  }, [betValue]);

  return(
    <div className={'padding-10 horizontalFlex'}>
      <div className={'valueSelector padding-10 verticalFlex'} >
        <img id={"UpArrow"} className={'arrow'} onClick={() => handleArrow(true)} src={Arrow}/>
        <div className={'value'}> <p>{BET_VALUES[betValue]}</p> </div>
        <img id={"downArrow"} className={'arrow downArrow'} onClick={() => handleArrow(false)} src={Arrow}/>
      </div>
      <div className={'padding-10 verticalFlex'}>
        <button id="OkButton" className={'button mainActionButton'}>Ok</button>
        <button className={'button mainActionButton'}>Dudo</button>
      </div>
    </div>

  )
}

export default ValueSelector;