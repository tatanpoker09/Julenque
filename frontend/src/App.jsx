import React, { useEffect, useState } from 'react';
import './App.scss';
import Game from './components/Game/Game';
import {useLocation, useParams} from "react-router";
import Lobby from "./components/LanderPage/Lobby";
import NameInput from "./components/Game/NameInput";

function Room() {
    let {game} = useParams();
    let query = useQuery();
    let started = false;
    const [name, setName] = useState(query.get("name"));

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

    function enterName(nameInput){
        setName(nameInput);
    }

  return (
      name?
      started?
        <Game players={players}/>
      : <Lobby code={game} name={name}/>
      : <NameInput  enterName={enterName}/>
  );
}

export default Room;
