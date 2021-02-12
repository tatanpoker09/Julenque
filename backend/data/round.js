const {ROUND_HEALTH_LOSS} = require("../../constants");

class Round {
    constructor(roundId, startingUser, userCount) {
        this.roundId = roundId;
        this.lastUser = null;
        this.currentUserTurn = startingUser; //This is the user who starts the round.
        this.status = "WAITING";
        this.maxConsecutivePass = this.getMaxConsecutivePass(userCount);
        this.maxConsecutiveRepeat = this.getMaxConsecutiveRepeat(userCount);
        this.consecutivePass = 0;
        this.consecutiveRepeat = 0;
    }

    getMaxConsecutivePass(userCount){
        if(userCount>=4){
            return 3;
        } else if(userCount===3){
            return 2;
        } else if(userCount===2){
            return 1;
        } else {
            //Default value for edge cases I might not consider?
            return 3;
        }
    }


    /**
     * Returns the amount of times a certain call can be repeated. This number is according to official ruleset + 1
     * This addition of 1 is because calling a number 1 time is equal to repeating it 0 times.
     * @param userCount - Amount of users alive in the round.
     * @returns {number}
     */
    getMaxConsecutiveRepeat(userCount) {
        if(userCount>=4){
            return 4;
        } else if(userCount === 3){
            return 2;
        } else if(userCount === 2){
            return 1;
        }
    }

    /**
     * Starts the round.
     * @param users
     */
    startRound(users){
        let publicUserData = [];
        users.forEach(user => {
            const publicData = user.getPublicUserData();
            publicUserData.push(publicData);
        });

        users.forEach( user => {
            user.sendPublicData(publicUserData);
            user.sendStartingUser(this.currentUserTurn.name);
        });
        this.status = "STARTED";

    }

    /**
     * Changes current user to the next alive user.
     * @param newUser - The next alive user.
     */
    changeUser(newUser){
        this.updateRepeating(this.lastUser, this.currentUserTurn);
        this.lastUser = this.currentUserTurn;
        this.currentUserTurn = newUser;
    }


    updateRepeating(lastUser, newUser) {
        if(lastUser) {
            if (newUser.lastDecision === lastUser.lastDecision) {
                this.consecutiveRepeat += 1;
            }
        }
        if(newUser){
            if (newUser.lastDecision === 7) {
                this.consecutivePass += 1;
            }
        }
    }

    reportUser(reporter, reported, lastUser, reason){
        if(reason==="DECISION") {
            if (reported.lastDecision < lastUser.lastDecision) {
                this.endRound(reported);
                //This is a correct report.
            } else {
                this.endRound(reporter);
                //This is a false report.
            }
        } else if(reason==="PASS"){
            if(this.consecutivePass>this.maxConsecutivePass){
                //This is a correct report
                this.endRound(reported);
            } else {
                //THIS IS A FALSE REPORT
                this.endRound(reporter);
            }
        } else if(reason==="REPEATING"){
            if(this.consecutiveRepeat>this.maxConsecutiveRepeat){
                //This is a correct report
                this.endRound(reported);
            } else {
                //THIS IS A FALSE REPORT
                this.endRound(reporter);
            }
        }
    }

    /**
     * Called when a user challenges another one (calles dudo).
     * @param challenger - The one who doubts. El que duda
     * @param challenged - The one being doubted. El dudado
     */
    challengeUser(challenger, challenged){
        const result = challenged.challenged();
        if(result.challengeStatus==="WON"){
            //The challenged won. Challenger lost.
            this.endRound(challenger);
        } else {
            //Challenged lost, correct doubt!
            this.endRound(challenged);
        }
    }

    /**
     *
     * @param caller - User who has the powerup.
     * @param target - User who loses a life.
     */
    userCallsJulenque(caller, target){
        if(caller.powerups.julenque){
            //Only if he has the powerup.
            if(target.health > 0 ){
                target.sendJulenqueTargetConfirmation();
            }
        }
    }

    julenqueConfirm(caller, target){
        if(caller.powerups.julenque){
            //Only if he has the powerup.
            if(target.health > 0 ){
                if(target.powerups.antijulenque){
                    this.endRound(caller);
                } else {
                    this.endRound(target);
                }
                //If target is alive.
            }
        }
    }

    userCallsReroll(caller, target){
        if(caller.powerups.reroll){
            const dice = caller.dice.rollDice(1).dices[0];
            target.health = dice;

            //TODO send info on what number appeared and update public data for everyone.
        }
        //Else we ignore this fake call...
    }




    endRound(loser){
        loser.health -= ROUND_HEALTH_LOSS;
        //TODO SEND EVERYONE INFO ON WHO LOST LIVES.
        //We go to next round maybe? Maybe we leave it for another request.
        this.status = "ENDED";
    }
}

module.exports = Round;
