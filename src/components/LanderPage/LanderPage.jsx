import React, {useState} from "react";
import Readme from "./README";
import {CODE_LENGTH, MAX_NAME_LENGTH} from '../../config/generalValues.json';
import Lobby from "./Lobby";
import {createNewRoom, joinRoom} from "../../services/roomService";

import "./LanderPage.scss"
import '../../App.scss';



class LanderPage extends React.Component{
  constructor(props) {
    super(props);
    this.props = props;
    this.players = props.players;
    this.setPlayers = props.setPlayers;
    this.setInGame = props.setInGame;
    this.state = {
      LandingPageState: "LandingPage",
      JoinCondition: "NewGame",
      code: "",
      name: "",
    }
    this.handleCancel = this.handleCancel.bind(this);
    this.handleJoinGame = this.handleJoinGame.bind(this);
    this.handleNewGame = this.handleNewGame.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handleGameLobby = this.handleGameLobby.bind(this);
  }


  handleJoinGame() {
    this.setState({LandingPageState: "GameTransition", JoinCondition: "JoinGame"})
  }

  handleNewGame(){
    this.setState({LandingPageState: "GameTransition", JoinCondition: "NewGame"})
  }

  handleCancel(){
    this.setState({LandingPageState: "LandingPage"})
  }

  handlePlay(){
    this.setInGame(true);
  }

  handleGameLobby(){
    if(this.state.JoinCondition==='NewGame') {
      createNewRoom(this.state.name).then(response => {
        this.setState({code: response.data}, () => {
            if (this.state.code.length === 4) {
              this.props.history.push(`/${this.state.code}?name=${this.state.name}`)
            } else {
              alert('Ingresa un código')
            }
          });
        });
      } else if(this.state.JoinCondition==='JoinGame'){
        this.props.history.push(`/${this.state.code}?name=${this.state.name}`)
      }
    }

    render() {
      return(
          <>
            {
              {
                'LandingPage':
                    <div>
                      <div className={'GameButtons'}>
                        <button className={'Button LanderButton'} onClick={this.handleJoinGame}>Unirse a juego</button>
                        <button className={'Button LanderButton'} onClick={this.handleNewGame}>Nuevo juego</button>
                      </div>
                      <Readme/>
                    </div>,
                'GameTransition':
                    <div>
                      { this.state.JoinCondition === 'JoinGame'?
                          <div className={'Row Vertical'}>
                            <label className={'InputLabel'}>Código:</label>
                            <input
                                type={'text'}
                                className={'InputCode'}
                                maxLength={CODE_LENGTH}
                                onChange={(event) => this.setState({code:event.target.value})}
                            />
                          </div>: null
                      }
                      <div className={'Row Vertical'}>
                        <label className={'InputLabel'}>Nombre de usuario:</label>
                        <input className={'InputName'} maxLength={MAX_NAME_LENGTH} type={'text'}
                            onChange={(event)=> this.setState({name: event.target.value})}/>
                      </div>
                      <div className={'Row'}>
                        <button className={'Button LanderButton'} onClick={this.handleGameLobby}>Jugar</button>
                        <button className={'Button LanderButton'} onClick={this.handleCancel}>Cancelar</button>
                      </div>
                    </div>
              }[this.state.LandingPageState]
            }
          </>
      );
    }


}

export default LanderPage;