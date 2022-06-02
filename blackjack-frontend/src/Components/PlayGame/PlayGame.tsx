import React, { useEffect, useState } from 'react';
import './PlayGame.css';

import { useDispatch, useSelector } from 'react-redux';
import { IDeck } from '../../Interfaces/IDeck';
import { IUser } from '../../Interfaces/IUser';
import {
  getDealPlayer,
  getDealDealer,
  initializeDeck,
  getDeck,
} from '../../Slices/DeckSlice';
import { AppDispatch, RootState } from '../../Store';

import spade2 from '../../images/clubTwo.png';
import diamondQueen from '../../images/diamondQueen.png';
import spadeAce from '../../images/spadeAce.png';
import heartKing from '../../images/heartKing.png';

// going inside PlaGamePage
export const PlayGame: React.FC<IDeck> = (deck: IDeck) => {
  const dispatch: AppDispatch = useDispatch();

  const deckInfo = useSelector((state: RootState) => state.deck);
  const userInfo = useSelector((state: RootState) => state.user);
  const playerHand = useSelector((state: RootState) => state.deck.playerHand);
  const dealerHand = useSelector((state: RootState) => state.deck.dealerHand);
  const isDeck = useSelector((state: RootState) => state.deck.isDeck);

  const [gameStatus, setGameStatus] = useState('Game not initialized');
  console.log('coming from PlayGame line 31 ', isDeck);

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

  return (
    <>
      <div className="gameContainer">
        {/* {gameStatus.includes("Game not initialized") ?
          <div className="game-start-btn-container">
            {/* <button className="game-start-btn" onClick={handleGameInit}>Start Game</button> 

          </div> : <></>
        } */}

        <div className="selectionArea">
          <h1>BlacKing</h1>
          {/*<StartGameButton/>
          //<button onClick={handleGameInit}>Start</button> 
          <HitButton/> */}
          
          <button>Stand</button>
          <button>Value</button>
          <button>Score</button>
        </div>

        {isDeck && (
          <div className="playArea">
            <div className="dealContainer">
              <h1> dealer </h1>
              <img src={spade2} />
              <img src={diamondQueen} />
            </div>

            <div className="userContainer">
              <h1>User</h1>


          </div>
          {/* 
          <button className="stand-button" onClick={handleStandButton}>Stand!</button> */}
        </div>

              <img src={spadeAce} />
              <img src={heartKing} />
            </div>


            {/* <div className="dealer-hand-container">

          </div> */}

            {/* <div className="deck-container"></div>

          <div className="player-hand-container">


          </div> */}
            {/* <button className="hit-button" onClick={handleHitButton}>Hit!</button>
          <button className="stand-button" onClick={handleStandButton}>Stand!</button> */}
          </div>
        )}
      </div>
    </>
  );
};
