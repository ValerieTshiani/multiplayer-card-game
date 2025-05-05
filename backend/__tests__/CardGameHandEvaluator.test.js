const Eval = require('../modules/CardGameHandEvaluator.js');

describe('CardGameHandEvaluator.tieBreaker', () => {

  test('returns array when suit-product tie persists', () => {
    const handA = {
      playerHand: Array(5).fill({ suit:'♦', rank:'2' }),
      total: 10,
      playerIndex: 0
    };
    const handB = {
      playerHand: Array(5).fill({ suit:'♦', rank:'2' }),
      total: 10,
      playerIndex: 1
    };

    const result = Eval.tieBreaker([handA, handB]);
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(2);
  });
});
