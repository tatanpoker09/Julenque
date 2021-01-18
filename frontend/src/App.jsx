import React, { useEffect, useState } from 'react';
import './App.scss';
import Game from './components/Game/Game';
import LanderPage from "./components/LanderPage/LanderPage";
import ExitButtonImage from '../src/assets/Exit.png'


function App() {
  const [players, setPlayers] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [inGame, setInGame ] = useState(false);


  const handleExitGame = () => {
    if (window.confirm('¿Estás seguro de querer salir?')) setInGame(false);
  }

  useEffect(() => {
    if (!loaded){
      setPlayers([
        {name: 'Diego', life:1, dices: {dice1: null, dice2: null}},
        {name: 'Elias', life:4, dices: {dice1: null, dice2: null}},
        {name: 'Tatan', life:6, dices: {dice1: 3, dice2: 3}},
        {name: 'Sali', life:5, dices: {dice1: null, dice2: null}},
        {name: 'Nico', life:6, dices: {dice1: null, dice2: null}},
        {name: 'Lucas', life:5, dices: {dice1: null, dice2: null}},
        {name: 'Sali', life:5, dices: {dice1: null, dice2: null}},
        {name: 'Nico', life:6, dices: {dice1: null, dice2: null}},
        {name: 'Lucas', life:5, dices: {dice1: null, dice2: null}},
      ]);
      setLoaded(true);
    }
  })




  return (
    <div className="app">
      <header className="appHeader">
        <div className="centered">

          <h1>Julenque</h1>
          {inGame?
              <div className={'gameDice clickable'} onClick={handleExitGame}>
                <img className={'gameDiceImage'} src={ExitButtonImage}/>
              </div>

            :
            null
          }
        </div>

      </header>
      <div className="main">
        {inGame?<Game players={players}/>:<LanderPage players={players} setPlayers={setPlayers} setInGame={setInGame}/>}

      </div>
    </div>
  );
}

export default App;
