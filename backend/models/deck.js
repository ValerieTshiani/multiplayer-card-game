const Card = require('./card.js');
const Eval = require('../modules/CardGameHandEvaluator.js');

class Deck {
    /**
     * @param {number} deckCount  — how many 52-card decks to combine
     */
    constructor(deckCount = 2) {
      this.suits = ['♠', '♥', '♦', '♣'];
      this.ranks = ['A', '2', '3', '4', '5', '6', '7',
                     '8', '9', '10', 'J', 'Q', 'K'];
      this.deckCount = deckCount;
      this.decks = this.createDeck();
    }
  
    createDeck() {
      let allCards = [];
      for (let d = 0; d < this.deckCount; d++) {
        for (const suit of this.suits) {
          for (const rank of this.ranks) {
              allCards.push(new Card(suit, rank));
          }
        }
      }
      return allCards; 
    }
  
    
    shuffle() {
     // Fisher–Yates shuffle
     //loop through the deck starting from the last element
      for (let i = this.decks.length - 1; i > 0; i--) { 
        
        // Generate a random index `j` between 0 and `i` (inclusive)
        const j = Math.floor(Math.random() * (i + 1));

        // Swap the element at index `i` with the element at index `j`
        [this.decks[i], this.decks[j]] = [this.decks[j], this.decks[i]];
      }
      return this.decks;
    }
  
    // Draw 5 cards
    dealHand(handSize = 5)
    {
      let hand = this.decks.splice(0, handSize);
      let total = Eval.evaluateHand(hand);

      // we are bringing back the hand and  the score/total
       return  { 
            playerHand: hand,
            total: total
        }
    }

    // How many cards remain?
    count() {
      return this.decks.length;
    }
  }
  
  module.exports = Deck;
  