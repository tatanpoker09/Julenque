import axios from "axios";

export function createNewRoom(){
    return axiosPost("/game/create");
}

function axiosPost(url, params){
    let BACKEND_HOST = "http://localhost:3000";
    return axios.post(`${BACKEND_HOST}${url}`, {}, {params: {params}});
}

export function joinRoom(code, name){
}
function axiosGet(url, params){
    let BACKEND_HOST = "http://localhost:3000";
    return axios.get(`${BACKEND_HOST}${url}`, {params: {params}});
}