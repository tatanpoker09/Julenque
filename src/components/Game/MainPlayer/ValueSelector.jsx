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
          document.getElementById("DownArrow").click();
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
    <div className={'Padding-10 HorizontalFlex'}>
      <div className={'ValueSelector Padding-10 VerticalFlex'} >
        <img id={"UpArrow"} className={'Arrow'} onClick={() => handleArrow(true)} src={Arrow}/>
        <div className={'Value'}> <p>{BET_VALUES[betValue]}</p> </div>
        <img id={"DownArrow"} className={'Arrow DownArrow'} onClick={() => handleArrow(false)} src={Arrow}/>
      </div>
      <div className={'Padding-10 VerticalFlex'}>
        <button id="OkButton" className={'Button Play'}>Ok</button>
        <button className={'Button Play'}>Dudo</button>
      </div>
    </div>

  )
}

export default ValueSelector;