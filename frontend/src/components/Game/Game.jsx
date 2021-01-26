import React from "react";
import MainPlayer from './MainPlayer/MainPlayer';
import MainBoard from './MainBoard';
import PlayerName from './PlayerName';
import {useGame} from "../../services/websocketService";




function Game({code, name}) {

    const {players} = useGame(code, name);


    function onRoundStart(){

    }

    let player = players.filter((player)=>player.name===name)[0];
    if(!player){
        player = {name: 'Lucas', health: 5, dices: {dice1: 4, dice2: 4}};
    }

  return(
    <>
      <div className="opponents">
        <div className="playercol">
          {players.slice(0, 5).map((player, i) =>
            <PlayerName player={player} key={i}/>
          )}
        </div>
        <MainBoard players={players} refresh={player.dices} />
        <div className="playercol">
          {players.slice(5).map((player, i) =>
            <PlayerName player={player} key={i + 5}/>
          )}
        </div>
      </div>
      <MainPlayer player={player}/>
    </>
  );
}

export default Game;