import React, { useEffect, useState } from 'react';
import './PlayGame.css';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { IDeck } from '../../Interfaces/IDeck';

import { AppDispatch, RootState } from '../../Store';
import StartGameButton from '../StartGameButton/StartGameButton';
import { HitButton } from '../HitButton/HitButton';

import {
  setGameStatus,
  setWinner,
  togglePlayerBusted,
} from '../../Slices/GameSlice';
import { getDealDealer, quitGame } from '../../Slices/DeckSlice';
import { StandButton } from '../StandButton/StandButton';
import NextRound from '../NextRound/NextRound';
import { depositMoney, sendMail, toggleLock, userBet, withdrawMoney } from '../../Slices/UserSlice';

import {
  ValueCounter,
  calcCardValue,
  calcHandValue,
  calcVisibleDealerHandValue,
} from '../ValueCounter/ValueCounter';

import { ToastContainer, toast, TypeOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// going inside PlaGamePage
export const PlayGame: React.FC<IDeck> = (deck: IDeck) => {
  const navigator = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const gameState = useSelector((state: RootState) => state.game);
  const deckState = useSelector((state: RootState) => state.deck);
  const myUserState = useSelector((state: RootState) => state.user);

  const isDeck = useSelector((state: RootState) => state.deck.isDeck);
  const deckInfo = useSelector((state: RootState) => state.deck.deck);

  const playerCards = useSelector((state: RootState) => state.deck.playerHand);
  const dealerCards = useSelector((state: RootState) => state.deck.dealerHand);

  console.log('coming from PlayGame line 46 ', gameState);
  console.log('coming from PlayGame line 47', myUserState);

  const handleScoreBoard = (event: React.MouseEvent<HTMLButtonElement>) => {
    navigator('/scores');
  };

  const handleQuit = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(setGameStatus('Game not Initialized')); //set game status to not initiated
    dispatch(quitGame());
    dispatch(setWinner('none'));
    dispatch(togglePlayerBusted());
  };

  useEffect(() => {
    let amount = {
      userId: myUserState.user?.userId ? myUserState.user.userId : 0,
      amount: myUserState.bet,
    };

    if (!myUserState.lockBet) { //if the bets are not locked, perform the transactions
      if (gameState.winner.includes("player")) {  //double that amount that the player bets
        amount.amount = myUserState.bet * 2;
        dispatch(depositMoney(amount));
        dispatch(userBet(0));

      } else if (gameState.winner.includes("dealer")) { //withdraw the amount of money the player bets
        dispatch(withdrawMoney(amount));
        dispatch(userBet(0));

      } else if (gameState.winner.includes("tie")) { // reset bet amount
        dispatch(userBet(0));

      }
    }
  }, [gameState.winner]);

  //central place for dealer ai to function
  useEffect(() => {
    if (gameState.isDealersTurn) {
      console.log("Dealer's Turn: ", gameState.isDealersTurn);
      if (calcHandValue(deckState.dealerHand) < 17 && gameState.isDealersTurn) {
        //dealer must draw until 17
        console.log('dealer draws');
        dispatch(getDealDealer(deckState.deck?.deckId));
      } else if (
        calcHandValue(deckState.dealerHand) >= 17 &&
        gameState.isDealersTurn
      ) {
        //dealer has finished his turn
        console.log('Iam dealer, and Im done drawing!!');

        //Determine if dealer busts!
        if (
          calcHandValue(deckState.dealerHand) > 21 &&
          calcHandValue(deckState.playerHand) < 21
        ) {
          dispatch(setWinner('player'));
        } else if (
          calcHandValue(deckState.dealerHand) == 21 &&
          calcHandValue(deckState.playerHand) !=
          calcHandValue(deckState.dealerHand)
        ) {
          dispatch(setWinner('dealer'));
        } else if (
          calcHandValue(deckState.playerHand) <
          calcHandValue(deckState.dealerHand) &&
          calcHandValue(deckState.dealerHand) < 21
        ) {
          dispatch(setWinner('dealer'));
        } else if (
          calcHandValue(deckState.playerHand) >
          calcHandValue(deckState.dealerHand) &&
          calcHandValue(deckState.playerHand) < 21
        ) {
          dispatch(setWinner('player'));
        } else if (
          calcHandValue(deckState.dealerHand) > 21 &&
          calcHandValue(deckState.playerHand) > 21
        ) {
          dispatch(setWinner('tie'));
        } else if (
          calcHandValue(deckState.playerHand) ==
          calcHandValue(deckState.dealerHand)
        ) {
          dispatch(setWinner('tie'));
        } else if (
          calcHandValue(deckState.playerHand) > 21 &&
          calcHandValue(deckState.dealerHand) < 21
        ) {
          dispatch(setWinner('dealer'));
        } else if (
          calcHandValue(deckState.playerHand) == 21 &&
          calcHandValue(deckState.playerHand) !=
          calcHandValue(deckState.dealerHand)
        ) {
          dispatch(setWinner('player'));
        } else {
          console.log('No conditions satisfied');
        }
      }

      //Unlock the bets
      if (myUserState.lockBet) {
        dispatch(toggleLock());
      }

    }
  }, [gameState.isDealersTurn, deckState.dealerHand]);

  useEffect(() => {
    if (gameState.winner === 'tie') {
      {
        toast.info('Wow! its a tie.', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
      }
    }

    if (gameState.winner !== 'none') {
      {
        toast.info('Hurray! You Won.', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
      }
    }
  }, [gameState.winner]);

  // toast.success('Hurray! Login Successfull.', {
  //   position: 'top-center',
  //   autoClose: 1500,
  //   hideProgressBar: false,
  //   closeOnClick: true,
  //   pauseOnHover: true,
  //   draggable: true,
  //   progress: undefined,
  //   theme: 'dark',
  // });

  type propNum = {
    dealerNum: number;
    playerNum: number;
  };

  let num: propNum = {
    dealerNum: 1,
    playerNum: 0,
  };

  return (
    <>
      <div className="gameContainer">
        <div
          className={
            gameState.gameStatus.includes('Game not Initialized')
              ? 'selectionArea '
              : 'selectionArea borderRight'
          }
        >
          {deckState.loading == false ? (
            <>
              {/* <h1>{gameState.gameStatus}</h1> */}
              <h1>BlacKing</h1>
            </>
          ) : (
            // <h1>Loading -- Give us a Moment</h1>
            <h1>Shuffling Your Deck</h1>
          )}

          {gameState.gameStatus.includes('Game not Initialized') ? (
            //if true (game not initialized)

            <div className="buttonsSidepanel">
              <StartGameButton />

              {deckState.loading == false ? (
                <button onClick={handleScoreBoard}>Score</button>
              ) : (
                <button onClick={handleScoreBoard} disabled={true}>
                  Score
                </button>
              )}
            </div>
          ) : (
            <div className="gameButtons">
              <HitButton />
              <StandButton />
              <NextRound />
              <button onClick={handleQuit}>Quit</button>
            </div>
          )}
        </div>

        <div className="playArea">
          <div className="dealContainer">
            <h1>
              <ValueCounter propNum={num.dealerNum} />
            </h1>
            {isDeck !== false &&
              dealerCards?.map((card) => {
                let suit1 = card.suit.toString();
                let rank1 = card.rank.toString();
                let path1 = suit1.split('').join().replace(/,/g, '');
                let path2 = rank1.split('').join().replace(/,/g, '');
                let imagePath = '../../images/' + path1 + path2;

                return (
                  <img
                    key={card.suit + '' + card.rank}
                    src={`${imagePath}.png`}
                    alt={`${card.suit}${card.rank}`}
                  />
                );
              })}
          </div>

          {gameState.winner === 'none' ? (
            <></>
          ) : (
            <div className="winnerContainer">
              <h1>
                {myUserState.user?.firstName} {myUserState.user?.lastName} wins
              </h1>
            </div>
          )}

          <div className="userContainer">
            <h1>
              <ValueCounter propNum={num.playerNum} />
            </h1>
            {isDeck !== false &&
              playerCards?.map((card) => {
                let suit1 = card.suit.toString();
                let rank1 = card.rank.toString();
                let path1 = suit1.split('').join().replace(/,/g, '');
                let path2 = rank1.split('').join().replace(/,/g, '');
                let imagePath = '../../images/' + path1 + path2;

                return (
                  <img
                    key={card.suit + '' + card.rank}
                    src={`${imagePath}.png`}
                    alt={`${card.suit}${card.rank}`}
                  />
                );
              })}
          </div>
        </div>

        <ToastContainer />
      </div>
    </>
  );
};
