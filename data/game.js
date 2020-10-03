import Round from "./round";

class Game {
    constructor() {
        //CREATE ID
        this.users = [];
        this.currentRound = null;
        this.currentRoundId = 0;
    }


    startNewRound(){
        this.currentRound = new Round(this.currentRoundId++); //Set round id and add 1 for next round.
        this.currentRound.startRound(this.users);
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
