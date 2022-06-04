import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../Store';
import { Rank, ICard } from '../../Interfaces/ICard';
import { access, readlink } from 'fs';
import './ValueCounter.css';

export const ValueCounter: React.FC<any> = (person: number) => {
  //get members of the state needed to calculate values
  const playerHand = useSelector((state: RootState) => state.deck.playerHand);
  const dealerHand = useSelector((state: RootState) => state.deck.dealerHand);
  const [dealerCount, setDealerCount] = useState(0);
  const [playerCount, setPlayerCount] = useState(0);
  //sample hands for testing
  /*let playerHand: ICard[] = [
        {
            rank: 0,
            suit: 0
        },
        {
            rank: 1,
            suit: 1,
        }
    ];

    let dealerHand: ICard[] = [
        {
            rank: 2,
            suit: 2
        },
        {
            rank: 3,
            suit: 3,
        }
    ];*/
  //when the hands change, recalculate and set them
  useEffect(() => {
    setDealerCount(calcVisibleDealerHandValue(dealerHand));
    setPlayerCount(calcHandValue(playerHand));
  }, [playerHand, dealerHand]);
  //how the counts are displayed
  return (
    <div className="allHandValues">
      {person == 0 ? (
        <div className="playerHandValue">
          <p>{playerCount}</p>{' '}
        </div>
      ) : (
        <div className="dealerHandValue">
          <p>{dealerCount}</p>{' '}
        </div>
      )}
    </div>
  );
};
//takes in a card and returns its value
//if the card is an ace, returns 1
export const calcCardValue: (card: ICard) => number = function (
  card: ICard
): number {
  let x = card.rank;
  if (x == Rank.TWO) {
    return 2;
  } else if (x == Rank.THREE) {
    return 3;
  } else if (x == Rank.FOUR) {
    return 4;
  } else if (x == Rank.FIVE) {
    return 5;
  } else if (x == Rank.SIX) {
    return 6;
  } else if (x == Rank.SEVEN) {
    return 7;
  } else if (x == Rank.EIGHT) {
    return 8;
  } else if (x == Rank.NINE) {
    return 9;
  } else if (x == Rank.TEN) {
    return 10;
  } else if (x == Rank.JACK) {
    return 10;
  } else if (x == Rank.QUEEN) {
    return 10;
  } else if (x == Rank.KING) {
    return 10;
  } else if (x == Rank.ACE) {
    return 1;
  } else {
    return -1;
    console.log('in the negative number');
  }
};
//takes in a hand and calculates its value
//always chooses most advantageous ace value
export const calcHandValue: (hand: ICard[] | undefined) => number = function (
  hand: ICard[] | undefined
): number {
  let value = 0;
  console.log('coming from calcHandValue line 100 ', hand);
  if (hand) {
    let aces = 0;
    for (let card of hand) {
      let current = calcCardValue(card);

      if (current == 1) {
        aces++;
      } else {
        value += current;
      }
    }

    for (let i = 0; i < aces; i++) {
      if (value + 11 + (aces - i - 1) > 21) {
        value += 1;
      } else {
        value += 11;
      }
    }
  }

  return value;
};
//calculates what you can see of the dealer's hand
export const calcVisibleDealerHandValue: (
  hand: ICard[] | undefined
) => number = function (hand: ICard[] | undefined): number {
  let value = 0;
  if (hand) {
    let aces = 0;
    for (let card of hand) {
      let index = hand.indexOf(card);
      if (index != 0) {
        let current = calcCardValue(card);
        if (current == 1) {
          aces++;
        } else {
          value += current;
        }
      }
    }
    for (let i = 0; i < aces; i++) {
      if (value + 11 + (aces - i - 1) > 21) {
        value += 1;
      } else {
        value += 11;
      }
    }
  } else {
    console.log('hand was undefined');
  }
  return value;
};
