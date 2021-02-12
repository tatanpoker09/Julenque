const {INITIAL_HEALTH} = require("../../constants");
const {Dice} = require("./dice");
const round = require("./round");


module.exports = class User {
    constructor(name) {
        this.name = name;
        this.health = INITIAL_HEALTH;
        this.dice = new Dice();
        this.powerups = {"julenque":false, "antijulenque": false, "reroll": false, "pass": false};
        this.connected = true;
        this.roundDiceRoll = null;
        this.lastDecision = -1; //1 to 12 is normal scale. 13 to 18 means pairs. 0 means pass. -1 means no last decision.
    }

    setDecision(decision){
        this.lastDecision = decision;
    }

    sendStartingUser(starting_user){
        this.socket.emit('round-start', starting_user);
    }

    /**
     * Wins means the user challenged has won, aka this user specifically.
     * El dudado.
     * @returns {{challengeStatus: string}}
     */
    challenged(){
        if(this.lastDecision === -1){
            //We ignore
        } else if(this.lastDecision===0){
            //If the user passed.
            if(this.powerups.pass){
                return {"challengeStatus": "WON"}
            } else {
                return {"challengeStatus": "LOST"}
            }
        } else if(this.lastDecision<13){
            const diceSum = this.roundDiceRoll.dices.reduce((a,b)=>a+b,0);
            if(this.lastDecision>diceSum){
                return {"challengeStatus": "LOST"}
            } else {
                return {"challengeStatus": "WON"}
            }
        } else {
            const pairNumber = this.lastDecision-12;
            if(this.roundDiceRoll.dices[0] === this.roundDiceRoll.dices[1]){
                //We have a pair
                if(this.roundDiceRoll.dices[0]<pairNumber){
                    return {"challengeStatus": "LOST"}
                } else {
                    return {"challengeStatus": "WON"}
                }
            } else {
                return {"challengeStatus": "LOST"}
            }
        }
    }

    sendJulenqueTargetConfirmation(){
        if(this.powerups.antijulenque){
            //TODO SEND AN ANTIJULENQUE
        } else {
            //TODO SEND AN SHOW CARDS or DONT SHOW.
        }
    }

    /**
     * TODO SEND THIS TO THE USER.
     *
     * @param publicUserData
     */
    sendPublicData(publicUserData){
        this.socket.emit('public-data', publicUserData);
    }

    /**
     * TODO
     * We need to send this to the user.
     */
    sendPrivateData(){
        let privateData = this.getPrivateUserData();
        this.socket.emit('private-data', privateData);
    }

    /**
     * Returns data to send to every player at the start of a round.
     * @returns {{publicData: {name: string, health: number}}}
     */
    getPublicUserData(){
        return {"publicData": {
                "name": this.name,
                "health": this.health
            }
        };
    }

    /**
     * Returns data to send only to this specific user at the start of a round.
     */
    getPrivateUserData(){
        let dice = this.rollUserDice();
        this.updatePowerups(dice);
        return {"privateData": {
                "name": this.name, //Just to make sure we're sending to the correct user.
                "dice": dice,
                "powerups": this.powerups
            }
        }
    }

    rollUserDice(){
        const roundDiceRoll = this.dice.rollDice(2);
        this.roundDiceRoll = roundDiceRoll;
        return roundDiceRoll;
    }

    rollOneDie(){
        return this.dice.rollDice(1);
    }

    changeName(name){
        this.name = name;
    }

    setJulenque(value){
        this.powerups.julenque = value;
    }

    setReroll(value){
        this.powerups.reroll = value;
    }

    setAntijulenque(value){
        this.powerups.antijulenque = value;
    }

    setPass(value){
        this.powerups.pass = value;
    }

    /**
     * Has to be called at the start of a round, updates powerup values depending on dice values.
     * @param dice_values - Uses values of dice.
     */
    updatePowerups(dice_values){
        let numbers_array = dice_values;
        if(numbers_array.length === 2){
            if(numbers_array[0] === 1 && numbers_array[1] === 2 || numbers_array[0] === 2 && numbers_array[1] === 1){
                //Tenemos julenque
                this.setJulenque(true);
            }
            if(numbers_array[0] === 1 && numbers_array[1] === 3 || numbers_array[0] === 3 && numbers_array[1] === 1){
                this.setReroll(true);
            }
            let sum = numbers_array.reduce((a,b) =>  a+b, 0);
            if(sum === 8){
                this.setAntijulenque(true);
            } else if(sum === 7){
                this.setPass(true);
            }
        } else {
            console.log("Invalid numbers_array value");
        }
    }

    setGameID(game_id) {
        this.game_id = game_id;
    }
}
