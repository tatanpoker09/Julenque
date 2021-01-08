import React, { useEffect, useState } from 'react';
import './App.scss';
import MainPlayer from './components/MainPlayer/MainPlayer';
import MainBoard from './components/MainBoard';
import PlayerName from './components/PlayerName';


function App() {
  const [players, setPlayers] = useState([]);
  const [loaded, setLoaded] = useState(false);

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
    <div className="App">
      <header className="App-header">
        <div className="Centered"> <h1>Julenque</h1> </div>
      </header>
      <div className="main">
        <div className="opponents">
          <div className="playercol">
            {players.slice(0, 5).map((player, i) =>
              <PlayerName player={player} key={i}/>
            )}
          </div>
          <MainBoard players={players}/>
          <div className="playercol">
            {players.slice(5).map((player, i) =>
              <PlayerName player={player} key={i + 5}/>
            )}
          </div>
        </div>
        <MainPlayer/>
      </div>
    </div>
  );
}

export default App;
