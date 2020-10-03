import {ROUND_HEALTH_LOSS} from "./constants";

export default class Round {
    constructor(roundId, startingUser) {
        this.roundId = roundId;
        this.startingUser = startingUser; //This is the user who starts the round.
        this.status = "WAITING";
    }

    /**
     * Starts the round.
     * @param users
     */
    startRound(users){
        let publicUserData = [];
        users.forEach(user => {
            user.sendPrivateData();
            const publicData = user.getPublicUserData();
            publicUserData.push(publicData);
        });

        users.forEach( user => {
            user.sendPublicData(publicUserData);
        });
        this.status = "STARTED";
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
