function changeCurrentCount(G, ctx, currentCount){
    G.pastCount = G.currentCount;
    G.currentCount = currentCount;
}
function doubtPlayer(G, ctx, doubtedPlayer){

}

function callJulenque(G, ctx, targetPlayer){

}

function callRandom(G, ctx, targetPlayer){

}

function pass(G, ctx){

}

function reportMove(G, ctx){

}

export const Julenque = {
    name: 'Julenque',

    setup: (ctx, setupData) => {
        console.log(setupData);
        const players = Array(ctx.numPlayers).fill({});
        players.forEach((player)=>{
            player.lives = 6;
        });
        return {currentCount: 0, players: players};
    },


    turn: {
        moveLimit: 1,
    },

    phases: {
      normalRound: {
          onBegin:  (G, ctx) => {
              G.players.forEach((player)=>{
                  player.dice_value = ctx.random.Die(6, 2);
              });
          },

          moves: {changeCurrentCount, doubtPlayer, callJulenque, callRandom, pass, reportMove},
      }
    },

    /*playerView: (G, ctx, playerID) => {
        return PlayerView.STRIP_SECRETS;
    }*/
};
