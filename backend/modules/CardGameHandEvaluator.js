class CardGameHandEvaluator{

    static evaluateHand (playerHand){

        let sumOfHand = 0;
        playerHand.forEach((card) => {
            const rank = card.rank.toUpperCase();
            let cardValue;
            switch(rank) {
                case 'J':
                    cardValue = 11;
                    break;
                case 'Q':
                    cardValue = 12;
                    break;
                case 'K':
                    cardValue = 13;
                    break;
                case 'A':
                    cardValue = 11;
                    break;
                default:
                    // Convert numeric ranks to numbers else give it a zero
                    cardValue = parseInt(rank, 10) || 0;
            }
            sumOfHand += cardValue;
        });
  
        return sumOfHand;
      }

    static tieBreaker (Hands){
      /* • In the event of a tie, the scores are recalculated for only the tied players by 
                 calculating a "suit score" for: 
              •Each player to see if the tie can be broken (it may not).
              •Each card is given a score based on its suit, with diamonds = 1,
                 hearts = 2, spades = 3 and clubs = 4, 
                  and the player's score is the multiplication of all 5 suit value.
            */           
            let maxValue = 0;
            let winners = [];
            Hands.forEach((hand) => {
                let suitMultiple = 1;
                hand.playerHand.forEach((card) =>  {
                    //suits  ['♠', '♥', '♦', '♣'];
                    const suit = card.suit
                    let cardValue;
                    switch(suit) {
                        case '♦':
                            cardValue = 1;
                            break;
                        case '♥':
                            cardValue = 2;
                            break;
                        case '♠':
                            cardValue = 3;
                            break;
                        case '♣':
                            cardValue = 4;
                            break;
                    }
                    suitMultiple*=cardValue;
                });

                // find the hand that has the highest suitMultiple
                // if there is another tie return the hands
                 // compare and update winners
                if (suitMultiple > maxValue) {
                    maxValue = suitMultiple;
                    winners = [hand];
                } else if (suitMultiple === maxValue) {
                    winners.push(hand);
                }
                 
            });

            // if still tied winners.length will be greater than one
            return winners;
    }
    
}
module.exports = CardGameHandEvaluator;