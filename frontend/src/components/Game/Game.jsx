import React from "react";
import MainPlayer from './MainPlayer/MainPlayer';
import MainBoard from './MainBoard';
import PlayerName from './PlayerName';




function Game({ players }) {

  return(
    <>
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
    </>
  );
}

export default Game;