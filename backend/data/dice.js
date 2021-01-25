/*
Amount of dices, then returns stuff
 */
class Dice{
    constructor() {

    }

    /**
     * Returns an array with two random numbers between 1 and 6.
     * @returns {{dices: [int]}}
     */
    rollDice(amount){
        let dice_array = [];
        for (let i = 0; i < amount; i++) {
            const dice_value = this.getRandomArbitrary(1,7);
            dice_array.push(dice_value);
        }
        return {"dices": dice_array};
    }
    /**
     * Returns a random number between min (inclusive) and max (exclusive)
     */
    getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }
}

module.exports = {Dice};