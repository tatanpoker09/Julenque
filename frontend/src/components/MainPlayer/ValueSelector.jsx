import React, { useEffect } from "react";
import { isDOMComponent } from "react-dom/test-utils";
import Arrow from '../../assets/Arrow.svg';

const values = {
  1: '1', 2: '2',
  3: '3', 4: '4',
  5: '5', 6: '6',
  7: '7', 8: '8',
  9: '9', 10: '10',
  11: '11', 12: '12',
  13: '1-1', 14: '2-2',
  15: '3-3', 16: '4-4',
  17: '5-5', 18: '6-6',
}

function ValueSelector({value, setValue}) {

  const handleArrow = (up) => {
    if (up && value < 18) {
      setValue(value + 1);
    } else if (!up && value > 1) {
      setValue(value - 1);
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
          if (value > 13) {
            setValue(13);
          } else {
            setValue(1);
          }
          break;
        case 'd':
        case 'ArrowRight':
          if (value < 13) {
            setValue(13);
          } else {
            setValue(18);
          }
          break;
        case 'Enter':
          document.getElementById("OkButton").click();
          break;
        }
    };
    document.addEventListener("keyup", keyFunction);
    return () => {
      document.removeEventListener("keyup", keyFunction);
    };
  }, [value]);

  return(
    <div className={'Padding-10 HorizontalFlex'}>
      <div className={'ValueSelector Padding-10 VerticalFlex'} >
        <img id={"UpArrow"} className={'Arrow'} onClick={() => handleArrow(true)} src={Arrow}/>
        <div className={'Value'}> <p>{values[value]}</p> </div>
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