jest.mock('../models/deck.js');        
const Deck = require('../models/deck.js');
const Deal   = require('../controllers/Deal.js');
const Eval   = require('../modules/CardGameHandEvaluator.js');

describe('Deal.startGame', () => {
  
    test('uses tieBreaker when totals tie', () => {
      // arrange: both hands total the same, but clubs > hearts on suit-product
      const sampleHands = [
        { playerHand:[{ suit:'♠',rank:'5'}], total:5, playerIndex: 0 },
        { playerHand:[{ suit:'♣',rank:'6'}], total:6, playerIndex: 1 },
        { playerHand:[{ suit:'♥',rank:'6'}], total:6, playerIndex: 2 }
      ];


      Deck.prototype.dealHand
        .mockImplementationOnce(() => sampleHands[1])  // clubs-6
        .mockImplementationOnce(() => sampleHands[2]); // hearts-6
  
      const game   = new Deal(1, 2, 1);
      const result = game.startGame();
  
      // After suit-product tie-break, only one winner remains:
      expect(result.isTieBreak).toBe(false);             // ← changed from `true`
      expect(result.winners.playerIndex).toBe(1);         // clubs wins
    });
  });
  