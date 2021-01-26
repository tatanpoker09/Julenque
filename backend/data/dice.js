/*
Amount of dices, then returns stuff
 */
class Dice{
    constructor() {

    }

    /**
     * Returns an array with two random numbers between 1 and 6.
     * @returns [int]
     */
    rollDice(amount){
        let dice_array = [];
        for (let i = 0; i < amount; i++) {
            const dice_value = this.getRandomInt(1,6);
            dice_array.push(dice_value);
        }
        return dice_array;
    }
    /**
     * Returns a random integer between min (inclusive) and max (inclusive).
     * The value is no lower than min (or the next integer greater than min
     * if min isn't an integer) and no greater than max (or the next integer
     * lower than max if max isn't an integer).
     * Using Math.round() will give you a non-uniform distribution!
     */
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

module.exports = {Dice};