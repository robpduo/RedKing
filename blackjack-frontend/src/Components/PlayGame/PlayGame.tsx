import React, { useEffect, useState } from 'react';
import './PlayGame.css';

import { useDispatch, useSelector } from 'react-redux';
import { IDeck } from '../../Interfaces/IDeck';

import { StartGameButton } from '../StartGameButton/StartGameButton';

import { AppDispatch, RootState } from '../../Store';

import cloverTwo from '../../images/CLOVERSTWO.png';
import diamondQueen from '../../images/DIAMONDSQUEEN.png';

import spadeAce from '../../images/SPADESACE.png';
import heartKing from '../../images/HEARTSKING.png';

import { HitButton } from '../HitButton/HitButton';

// going inside PlaGamePage
export const PlayGame: React.FC<IDeck> = (deck: IDeck) => {
  const dispatch: AppDispatch = useDispatch();

  const deckInfo = useSelector((state: RootState) => state.deck.deck);
  const userInfo = useSelector((state: RootState) => state.user);

  const playerHand = useSelector((state: RootState) => state.deck.playerHand);

  const dealerHand = useSelector((state: RootState) => state.deck.dealerHand);

  const isDeck = useSelector((state: RootState) => state.deck.isDeck);
  console.log('coming from PlayGame line 31 ', deckInfo);

  const [gameStatus, setGameStatus] = useState('Game not initialized');
  // console.log('coming from PlayGame line 28 ', isDeck);

  // const [chipCount, setChipCount] = useState(1000);
  // const [betAmount, setBetAmount] = useState(0);
  // const [lockedBet, setLockedBet] = useState(0);
  // const [previousBet, setPreviousBet] = useState(0);
  // const [dealerCount, setDealerCount] = useState(0);
  // const [playerCount, setPlayerCount] = useState(0);
  // const [isBlackjack, setIsBlackJack] = useState(false);
  // const [isPlayerBusted, setIsPlayerBusted] = useState(false);
  // //const [didDouble, setDidDouble] = useState(false);
  // const [isDealersTurn, setIsDealersTurn] = useState(false);
  // const [isDealerBusted, setIsDealerBusted] = useState(false);
  // const [isHandComplete, setIsHandComplete] = useState(true);
  // const [winner, setWinner] = useState("");

  /* useEffect(() => {
      if(dealerCount > 21) {
        setIsDealerBusted(true);
        setWinner("player");
        setIsHandComplete(true);
      }
      if(dealerCount >= 17 && dealerCount < 22 && isDealersTurn) {
        if(dealerCount > playerCount) {
          setWinner("dealer");
          setIsHandComplete(true);
        }
        if(dealerCount < playerCount && !isPlayerBusted) {
          setWinner("player")
          setIsHandComplete(true)
        }
        if(dealerCount === playerCount && !isPlayerBusted) {
          setWinner("push")
          setIsHandComplete(true)
        }
      }
      if(dealerCount < 17 && isDealersTurn && !isPlayerBusted) {
        setTimeout(() => {
          dispatch(getDealDealer())
        }, 500);
      }
    }, [dealerCount]) */

  // const [id, setId] = useState(userInfo.user?.id)
  // const [lockedBet, setLockedBet] = useState(0)
  // const [previousBet, setPreviousBet] = useState(0)
  // const [dealerCount, setDealerCount] = useState(0)
  // const [playerCount, setPlayerCount] = useState(0)

  // const handleStandButton = () => {

  //   if (deckInfo && playerHand) {
  //     dispatch(getDealDealer);
  //   }

  // }

  // useEffect(() => {
  //   console.log('coming from PlayGame line 93 ', deckInfo);
  // }, [deckInfo]);

  let imgPath = '../../images/';

  return (
    <>
      <div className="gameContainer">
        <div className="selectionArea">
          <h1>BlacKing</h1>
          <StartGameButton />
          <HitButton />

          <button>Stand</button>
          <button>Value</button>
          <button>Score</button>
        </div>

        <div className="playArea">
          <h1> dealer </h1>
          {/* {playerHand?.map((hand) => hand?.suit)} */}
          {deckInfo &&
            deckInfo?.card?.map((hand) => {
              return (
                <div className="dealContainer">
                  {/* <img
                    src={`${imgPath}${hand.suit}${hand.rank}`}
                    key={hand.id}
                  /> */}

                  <p>{hand.suit}</p>
                </div>
              );
            })}

          <div className="userContainer">
            <h1>User</h1>
            <img src={spadeAce} />
            <img src={heartKing} />
          </div>
        </div>

        {/* {isDeck !== false && (
          <div className="playArea">
            <h1> dealer </h1>
            {playerHand?.map((hand) => {
              <div className="dealContainer" key={hand.id}>
                <img src={`../../images/${hand.suit}${hand.rank}`} />

              </div>;
            })}

            <div className="userContainer">
              <h1>User</h1>
              <img src={spadeAce} />
              <img src={heartKing} />
            </div>
          </div>
        )} */}
      </div>
    </>
  );
};
