
import {io} from "socket.io-client";
import {useEffect, useRef, useState} from "react";
import {getPlayers} from "./roomService";

import { LobbyClient } from 'boardgame.io/client';

const ENDPOINT = "https://localhost";
const PLAYER_CONNECTED_EVENT = "player-join";
const PLAYER_DISCONNECTED_EVENT = "player-leave";
const GAME_STARTING_EVENT = "game-start";

export function initializeSocket(code,name){
   return io.connect(ENDPOINT, {
       path: '/backend',
       query: {roomId : code,
           name: name}
   });
}

export const useLobby = (code, name, handlePlay) =>{
    const [players, setPlayers] = useState([]);
    const socketRef = useRef();

    useEffect(()=>{
        loadPlayers();
        socketRef.current = initializeSocket(code, name);
        console.log("Initializing client websocket!")
        socketRef.current.on(PLAYER_CONNECTED_EVENT, (name)=>{
            const player = {name: name};
            setPlayers((players)=>[...players, player]);
        });
        socketRef.current.on(PLAYER_DISCONNECTED_EVENT, (name)=>{
            console.log(`User ${name} disconnected!`);
            setPlayers((players)=>players.filter(item=>item.name!==name));
        });

        socketRef.current.on(GAME_STARTING_EVENT, async (data)=>{
            const matchID = data.matchID;
            //We join the match.
            const lobbyClient = new LobbyClient({ server: 'http://localhost:8000' });
            //todo save playerCredentials.
            const { playerCredentials } = await lobbyClient.joinMatch(
                'Julenque',
                matchID,
                {
                    playerID: name,
                    playerName: name,
                }
            );
            handlePlay();
        });

        return () => {
            socketRef.current.disconnect();
        }
    }, [code]);

    function sendGameStarting(){
        console.log("Sending game-start!");
        socketRef.current.emit('game-start');
    }

    function loadPlayers(){
        getPlayers(code).then(data=>{
            const players = data.data;
            setPlayers(players);
        })
    }

    return {players, sendGameStarting};
}


export const useGame = (code, name) => {
    const [players, setPlayers] = useState([
        {name: 'Diego', health:1, dices: {dice1: null, dice2: null}},
        {name: 'Elias', health:4, dices: {dice1: null, dice2: null}},
        {name: 'Tatan', health:6, dices: {dice1: 3, dice2: 3}},
        {name: 'Sali', health:5, dices: {dice1: null, dice2: null}},
        {name: 'Nico', health:6, dices: {dice1: null, dice2: null}},
        {name: 'Lucas', health:5, dices: {dice1: null, dice2: null}},
    ]);
    const socketRef = useRef();

    useEffect(()=> {
        socketRef.current = initializeSocket(code, name);
        console.log("Initializing game-client websocket!");

        socketRef.current.on('public-data', (data)=>{
            console.log("Received public data: ");
            const players = [];
            data.forEach(playerData=>{
                players.push({name: playerData.publicData.name, health: playerData.publicData.health, dices: {dice1: null, dice2: null}});
            });
            setPlayers(players);
            socketRef.current.emit('request-private-data');
        });


        socketRef.current.on('private-data', (data)=>{
            console.log("Received private data!: ");
            console.log(data);
            setPlayers((players)=>{
                players.forEach((player)=>{
                   if(player.name===data.privateData.name){
                       player.dices = {dice1: data.privateData.dice[0], dice2: data.privateData.dice[1]};
                       player.powerups = data.privateData.powerups;
                   }
                });
                return players;
            });
        });

        socketRef.current.on('round-start', (data)=>{
            setPlayers((players)=>{
                return players;
            });
        });

        socketRef.current.on('turn-start', (usernameStarter)=>{
            setPlayers((players)=>{
                players.forEach((player)=>{
                    player.currentTurn = player.name === usernameStarter; //This will set each player to false except the one who's turn started.
                });
                return players;
            });
        });


        return () => {
            socketRef.current.disconnect();
        }
    }, [code]);


    return {players};
}
