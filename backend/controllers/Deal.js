const Deck = require ('../models/deck.js');
const Eval = require( '../modules/CardGameHandEvaluator.js');

class Deal {

    constructor (numberOfDecks,playerCount, numberOfCardsDelt) //Constructor
    {
        this.numberOfDecks = numberOfDecks;
        this.playerCount = playerCount; 
        this.numberOfCardsDelt =  numberOfCardsDelt;
    }

    startGame() {
        //Initialise the Deck and Shuffle the cards
        const cardDeck = new Deck(this.numberOfDecks); 
        cardDeck.shuffle();

        //Get Evaluated Hands
        let hands = [];
        for (var playerIndex = 0; playerIndex < this.playerCount; playerIndex++)
        {
            let handData =  cardDeck.dealHand(this.numberOfCardsDelt); 

            hands.push({
                playerHand: handData.playerHand,
                total:handData.total,
                playerIndex : playerIndex
            });     
        }
        
        //Get winners
        let winners = this.getWinners (hands);
        
        return({
            hands: hands,
            winners : winners.winnersList ,
            isTieBreak: winners.isTieBreak
        })
    }

    getWinners (hands) {
        let winnersList = [];
        let isTieBreak = false;

        // Find the maximum total value
        const maxTotal = Math.max(...hands.map(h => h.total));
         
        // Find all hands with the maximum value (in case of ties)
         const winningHands = hands.filter(h => h.total === maxTotal);

         if(winningHands.length == 1){
            winnersList = winningHands;
        }
        else{ //tie breakers- more than one winning hand
            winnersList   =  Eval.tieBreaker(winningHands);
            if(winnersList.length > 1){
                isTieBreak = true;
            }
        }

        return {
            winnersList:winnersList,
            isTieBreak:isTieBreak
        };
    }

}
module.exports = Deal;