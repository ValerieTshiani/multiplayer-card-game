const Eval = require('../modules/CardGameHandEvaluator.js');
const Eval = require('../modules/CardGameHandEvaluator.js');

describe('CardGameHandEvaluator.tieBreaker', () => {
  test('breaks tie by suit product and returns single winner', () => {
    // Two hands both sum to 20, but one has higher suit product
    const hand1 = {
      playerHand: [
        { suit:'♣', rank:'2' },
        { suit:'♣', rank:'3' },
        { suit:'♦', rank:'4' },
        { suit:'♥', rank:'5' },
        { suit:'♠', rank:'6' }
      ], total: 20, playerIndex: 0
    };
    const hand2 = {
      playerHand: [
        { suit:'♦', rank:'2' },
        { suit:'♦', rank:'3' },
        { suit:'♦', rank:'4' },
        { suit:'♦', rank:'5' },
        { suit:'♦', rank:'6' }
      ], total: 20, playerIndex: 1
    };
    const winner = Eval.tieBreaker([hand1, hand2]);
    // hand1’s product: 4·4·1·2·3 = 96; hand2’s product: 1·1·1·1·1 = 1
    expect(winner.playerIndex).toBe(0);
  });

  test('returns array when suit-product tie persists', () => {
    const handA = { playerHand: Array(5).fill({ suit:'♦',rank:'2' }), total: 10, playerIndex: 0 };
    const handB = { playerHand: Array(5).fill({ suit:'♦',rank:'2' }), total: 10, playerIndex: 1 };
    const result = Eval.tieBreaker([handA, handB]);
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(2);
  });
});
