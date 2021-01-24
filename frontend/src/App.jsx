import React, { useEffect, useState } from 'react';
import './App.scss';
import Game from './components/Game/Game';
import {useLocation, useParams} from "react-router";


function Room(props) {
    const {match} = props;
    let {game} = useParams();
    let query = useQuery();

    const name = query.get("name");
    if(name===undefined){
        alert("There's no name.")
    } else {

    }

  const players = [
    {name: 'Diego', life:1, dices: {dice1: null, dice2: null}},
    {name: 'Elias', life:4, dices: {dice1: null, dice2: null}},
    {name: 'Tatan', life:6, dices: {dice1: 3, dice2: 3}},
    {name: 'Sali', life:5, dices: {dice1: null, dice2: null}},
    {name: 'Nico', life:6, dices: {dice1: null, dice2: null}},
    {name: 'Lucas', life:5, dices: {dice1: null, dice2: null}},
  ];



    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

  return (
    <div className="App">
      <header className="App-header">
        <div className="Centered">
          <h1>Julenque</h1>
        </div>

      </header>
      <div className="main">
        <Game players={players}/>
      </div>
    </div>
  );
}

export default Room;
