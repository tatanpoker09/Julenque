import {MAX_NAME_LENGTH} from "../../config/generalValues.json";
import React from "react";

export default class NameInput extends React.Component {
    constructor(props) {
        super(props);
        this.enterName = props.enterName;
        this.state = {name: ""};
    }

    render() {
        return(
            <>
                <div className={'Row Vertical'}>
                <label className={'InputLabel'}>Nombre de usuario:</label>
                <input className={'InputName'} maxLength={MAX_NAME_LENGTH} type={'text'}
                       onChange={(event)=> this.setState({name: event.target.value})}/>
            </div>
            <div className={'Row'}>
                <button className={'Button LanderButton'} onClick={()=>this.enterName(this.state.name)}>Entrar</button>
            </div>
            </>);
    }
}