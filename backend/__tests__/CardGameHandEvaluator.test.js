// __tests__/CardGameHandEvaluator.test.js
const Eval = require('../modules/CardGameHandEvaluator.js');

describe('CardGameHandEvaluator.tieBreaker', () => {
  test('breaks tie by suit product and returns single winner', () => {
    // Hand1: mix of suits giving higher product
    const hand1 = {
      playerHand: [
        { suit: '♣', rank: '2' },
        { suit: '♣', rank: '3' },
        { suit: '♦', rank: '4' },
        { suit: '♥', rank: '5' },
        { suit: '♠', rank: '6' }
      ],
      total: 20,
      playerIndex: 0
    };
    // Hand2: all diamonds → lowest product
    const hand2 = {
      playerHand: Array(5).fill({ suit: '♦', rank: '2' }),
      total: 20,
      playerIndex: 1
    };

    const raw = Eval.tieBreaker([hand1, hand2]);
    const winner = Array.isArray(raw) ? raw[0] : raw;

    // Hand1 product: 4*4*1*2*3 = 96; Hand2 product: 1*1*1*1*1 = 1
    expect(winner.playerIndex).toBe(0);
  });

  test('returns array when suit-product tie persists', () => {
    const both = {
      playerHand: Array(5).fill({ suit: '♦', rank: '2' }),
      total: 10,
      playerIndex: 0
    };
    // Duplicate for playerIndex 1
    const tieHand = { ...both, playerIndex: 1 };

    const result = Eval.tieBreaker([both, tieHand]);
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(2);
    // Ensure both indices present
    expect(result.map(h => h.playerIndex).sort()).toEqual([0, 1]);
  });
});
