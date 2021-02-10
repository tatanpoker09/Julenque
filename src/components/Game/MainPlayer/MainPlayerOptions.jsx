import React from "react";



function MainPlayerOptions({powerups}) {



  return(
    <div className={'MainPlayerOptions'}>
      <button className={'Button Options'} disabled={powerups.julenque}> Julenque </button>
      <button className={'Button Options'} disabled={powerups.reroll}> Aleatorio </button>
      <button className={'Button Options'} disabled={powerups.pass}> Paso </button>
      <button className={'Button Options'}> Reportar </button>
    </div>

  )
}

export default MainPlayerOptions;