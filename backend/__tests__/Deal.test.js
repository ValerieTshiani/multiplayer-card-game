const Deck = require('../models/deck.js');
const Deal = require('../controllers/Deal.js');

// Sample hands to be injected
const sampleHands = [
  // Hand for player 0
  {
    playerHand: [{ suit: '♠', rank: '5' }],
    total: 5,
    playerIndex: 0
  },
  // Hand for player 1 (higher total)
  {
    playerHand: [{ suit: '♣', rank: '6' }],
    total: 6,
    playerIndex: 1
  },
  // Alternate hand for tie-break test (same total, different suit) because of suit, wont be a tie
  {
    playerHand: [{ suit: '♥', rank: '6' }],
    total: 6,
    playerIndex: 2
  }
];

describe('Deal.startGame', () => {
  let dealSpy;

  beforeEach(() => {
    // Spy on the real dealHand, return sampleHands[0] then sampleHands[1]
    dealSpy = jest
      .spyOn(Deck.prototype, 'dealHand')
      .mockImplementationOnce(() => sampleHands[0])
      .mockImplementationOnce(() => sampleHands[1]);
  });

  afterEach(() => {
    dealSpy.mockRestore();
  });

  test('identifies single winner when totals differ', () => {
    // 2 players, 1 card each
    const game = new Deal(/* decks */ 2, /* players */ 2, /* cards */ 1);
    const result = game.startGame();

    expect(result.hands).toHaveLength(2);
    expect(result.hands[0].total).toBe(5);
    expect(result.hands[1].total).toBe(6);

   // Winner should be playerIndex 1, no tie-break ---- have to do it like this because of my bad return structure of arrays instead of one object winner
      const winner = Array.isArray(result.winners)
      ? result.winners[0]
      : result.winners;
    expect(winner.playerIndex).toBe(1);
    expect(result.isTieBreak).toBe(false); // because the different suits break the tie//Each card is given a score based on its suit, with diamonds = 1, hearts = 2, spades = 3 and clubs = 4, and the player's score is the multiplication of all 5 suit value.
  });

  test('uses tieBreaker when totals tie', () => {
    // Reset spy to return two equal-total hands: sampleHands[1], then sampleHands[2]
    dealSpy.mockReset()
      .mockImplementationOnce(() => sampleHands[1])
      .mockImplementationOnce(() => sampleHands[2]);

    const game = new Deal(2, 2, 1);
    const result = game.startGame();

    // Both players have total=6, but the suits differ so tie break is false
    expect(result.isTieBreak).toBe(false);

    // bad return types from my winners, this is why people write tests first, my fix my return type for my winners object

     const winner = Array.isArray(result.winners)
      ? result.winners[0]
      : result.winners;

    // Clubs (4) vs Hearts (2): clubs wins => playerIndex 0
    expect(winner.playerIndex).toBe(0);  // zero because we only submitted two hands, and the index is done by the sequence of hand insertion in the array
  });
});
