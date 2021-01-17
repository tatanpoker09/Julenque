import React, { useState } from "react";
import Readme from "./README";
import { CODE_LENGTH, MAX_NAME_LENGTH } from '../../config/generalValues.json';
import Lobby from "./Lobby";
require('./LanderPage.scss');




function LanderPage({ players, setPlayers, setInGame }) {

  const [landingPageState, setLandingPageState] = useState('LandingPage');
  const [joinCondition, setJoinCondition] = useState('NewGame');
  const [code, setCode] = useState('')

  const handleJoinGame = () => {
    setLandingPageState('GameTransition');
    setJoinCondition('JoinGame');
  }

  const handleNewGame = () => {
    setLandingPageState('GameTransition');
    setJoinCondition('NewGame');
    setCode(generateNewCode());
  }

  const generateNewCode = () => {
    return 'AAAA'
  }

  const handleCancel = () => {
    setLandingPageState('LandingPage');
  }

  const handlePlay = () => {
    setInGame(true);
  }

  const handleGameLobby = () => {
    if(code.length == 4) {
      setLandingPageState('Lobby');
    } else {
      alert('Ingresa un código')
    }
  }

  return(
    <>
    {
      {
        'LandingPage':
          <div>
            <div className={'GameButtons'}>
              <button className={'button landerButton'} onClick={handleJoinGame}>Unirse a juego</button>
              <button className={'button landerButton'} onClick={handleNewGame}>Nuevo juego</button>
            </div>
            <Readme/>
          </div>,
        'GameTransition':
          <div>
            { joinCondition === 'JoinGame'?
              <div className={'row vertical'}>
                <label className={'inputLabel'}>Código:</label>
                <input
                  type={'text'}
                  className={'inputCode'}
                  maxLength={CODE_LENGTH}
                  onChange={(event) => setCode(event.target.value)}
                />
              </div>: null
            }
            <div className={'row vertical'}>
              <label className={'inputLabel'}>Nombre de usuario:</label>
              <input className={'inputName'} maxLength={MAX_NAME_LENGTH} type={'text'}/>
            </div>
            <div className={'row'}>
              <button className={'button landerButton'} onClick={handleGameLobby}>Jugar</button>
              <button className={'button landerButton'} onClick={handleCancel}>Cancelar</button>
            </div>
          </div>,
        'Lobby':
          <Lobby handleCancel={handleCancel} players={players} setPlayers={setPlayers} handlePlay={handlePlay} code={code}/>
      }[landingPageState]
    }
    </>
  );
}

export default LanderPage;