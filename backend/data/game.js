const Round = require("./round");

 class Game {
    constructor() {
        //CREATE ID
        this.users = [];
        this.currentRound = null;
        this.currentRoundId = 0;
        this.connectedUsers = 0;
        this.nextRoundStarter = this.users[0];
        this.status = "LOBBY";
    }


    startNewRound(){
        let aliveUsers = 0;
        this.users.forEach(user =>{
            if(user.health>0) aliveUsers++;
        });
        let loser = this.nextRoundStarter;
        this.currentRound = new Round(this.currentRoundId++, loser, aliveUsers); //Set round id and add 1 for next round.
        this.currentRound.startRound(this.users);
    }

    setStatus(value){
        this.status = value;
    }

    userConnected(name, socket){
        this.users.forEach((user)=>{
            if(user.name===name){
                user.connected = true;
                socket.user = user;
                user.socket = socket;
                this.connectedUsers++;
                if(this.connectedUsers===this.users.length){
                    console.log("All players connected, starting new round!")
                    this.startNewRound();
                }
            }
        });
    }


    addUser(user){
        this.users.push(user);
    }

    /**
     * Removes a user from the game.
     * @param user
     * @returns {boolean} if the user was removed.
     */
    removeUser(user){
        const index = this.users.indexOf(user);
        if (index > -1) {
            this.users.splice(index, 1);
            return true;
        }
        return false;
    }
}

module.exports = Game;