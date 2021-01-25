import axios from "axios";

export function createNewRoom(name){
    return axiosPost(`/game/create`, {name: name});
}

function axiosPost(url, body, params){
    let BACKEND_HOST = "http://localhost:3000";
    return axios.post(`${BACKEND_HOST}${url}`, body, {params: {params}});
}

export function joinRoom(code, name){
}
function axiosGet(url, params){
    let BACKEND_HOST = "http://localhost:3000";
    return axios.get(`${BACKEND_HOST}${url}`, {params: {params}});
}

export function getPlayers(code){
    return axiosGet(`/game/${code}/players`);
}