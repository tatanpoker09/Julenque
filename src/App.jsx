import React, { useEffect, useState } from 'react';
import './App.scss';
import Game from './components/Game/Game';
import {useLocation, useParams} from "react-router";
import Lobby from "./components/LanderPage/Lobby";
import NameInput from "./components/Game/NameInput";

function Room() {
    let {game} = useParams();
    let query = useQuery();
    let [started, setStarted] = useState(false);
    const [name, setName] = useState(query.get("name"));


    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    function enterName(nameInput){
        setName(nameInput);
    }

  return (
      name?
      started?
        <Game code={game} name={name}/>
      : <Lobby handlePlay={()=>setStarted(true)} code={game} name={name}/>
      : <NameInput enterName={enterName}/>
  );
}

export default Room;
