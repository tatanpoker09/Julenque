import React from "react";
import Button from "react-bootstrap/Button";

export default class RoomView extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (<div>
            <div>Tatan</div>
            <div>Lucas</div>
            <div>NB</div>
            <div>Sali</div>
            <div>Elias</div>
            <div>Diegogo</div>
            <Button>Start Game</Button>
        </div>);
    }
}