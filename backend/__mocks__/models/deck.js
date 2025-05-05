class Deck {
    constructor() {}
    shuffle() { return this; }
    dealHand() {
   
      return { playerHand: [], total: 0 };
    }
  }
  module.exports = Deck;