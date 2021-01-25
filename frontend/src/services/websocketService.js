
import {io} from "socket.io-client";
import {useEffect, useRef, useState} from "react";
import {getPlayers} from "./roomService";
const ENDPOINT = "https://localhost";
const PLAYER_JOINED_EVENT = "player-join";

export function initializeSocket(code,name){
   return io.connect(ENDPOINT, {
       path: '/backend',
       query: {roomId : code,
           name: name}
   });
}

export const useLobby = (code, name) =>{
    const [players, setPlayers] = useState([]);
    const socketRef = useRef();

    useEffect(()=>{
        loadPlayers();
        socketRef.current = initializeSocket(code, name);
        console.log("Initializing client websocket!")
        socketRef.current.on(PLAYER_JOINED_EVENT, (name)=>{
            const player = {name: name};
            setPlayers((players)=>[...players, player]);
        });
        return () => {
            socketRef.current.disconnect();
        }
    }, [code]);

    function loadPlayers(){
        getPlayers(code).then(data=>{
            const players = data.data;
            setPlayers(players);
        })
    }

    return {players};
}