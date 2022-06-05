import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './PlayGame.css';
import { IDeck } from '../../Interfaces/IDeck';

import { AppDispatch, RootState } from '../../Store';
import StartGameButton from '../StartGameButton/StartGameButton';
import { HitButton } from '../HitButton/HitButton';

import { setGameStatus, setWinner, togglePlayerBusted } from '../../Slices/GameSlice';
import { getDealDealer, quitGame } from '../../Slices/DeckSlice';
import { StandButton } from '../StandButton/StandButton';
import NextRound from '../NextRound/NextRound';

import { ValueCounter, calcCardValue, calcHandValue, calcVisibleDealerHandValue } from '../ValueCounter/ValueCounter';

// going inside PlaGamePage
export const PlayGame: React.FC<IDeck> = (deck: IDeck) => {
  const navigator = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const gameState = useSelector((state: RootState) => state.game);
  const deckState = useSelector((state: RootState) => state.deck);

  const isDeck = useSelector((state: RootState) => state.deck.isDeck);
  const deckInfo = useSelector((state: RootState) => state.deck.deck);

  const playerCards = useSelector((state: RootState) => state.deck.playerHand);

  const dealerCards = useSelector((state: RootState) => state.deck.dealerHand);

  console.log('coming from PlayGame line 31', typeof playerCards);

  const handleScoreBoard = (event: React.MouseEvent<HTMLButtonElement>) => {
    navigator('/scores');
  };

  const handleQuit = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(setGameStatus('Game not Initialized')); //set game status to not initiated
    dispatch(quitGame());
    dispatch(setWinner("none"));
    dispatch(togglePlayerBusted());
  };

  //central place for dealer ai to function
  useEffect(() => {

    if (gameState.isDealersTurn) {

      console.log("Dealer's Turn: ", gameState.isDealersTurn);
      if (calcHandValue(deckState.dealerHand) < 17 && gameState.isDealersTurn) { //dealer must draw until 17
        console.log("dealer draws");
        dispatch(getDealDealer(deckState.deck?.deckId));

      } else if (calcHandValue(deckState.dealerHand) >= 17 && gameState.isDealersTurn) { //dealer has finished his turn
        console.log("Iam dealer, and Im done drawing!!");

        //Determine if dealer busts!
        if (calcHandValue(deckState.dealerHand) > 21 && calcHandValue(deckState.playerHand) < 21) {
          console.log("player wins with: ", calcHandValue(deckState.playerHand));
          dispatch(setWinner("player"));

        } else if (calcHandValue(deckState.dealerHand) == 21 && calcHandValue(deckState.playerHand) != calcHandValue(deckState.dealerHand)) { //dealer 
          console.log("dealer wins with: ", calcHandValue(deckState.dealerHand));
          dispatch(setWinner("dealer"));

        } else if (calcHandValue(deckState.playerHand) < calcHandValue(deckState.dealerHand) && calcHandValue(deckState.dealerHand) < 21) {
          dispatch(setWinner("dealer"));
          console.log("dealer wins with: ", calcHandValue(deckState.dealerHand));

        } else if (calcHandValue(deckState.playerHand) > calcHandValue(deckState.dealerHand) && !gameState.isPlayerBusted) {
          dispatch(setWinner("player"));
          console.log("player wins with: ", calcHandValue(deckState.playerHand));
          
        } else if (calcHandValue(deckState.dealerHand) > 21 && calcHandValue(deckState.playerHand) > 21) {
          dispatch(setWinner("tie"));
          console.log("Both players busted");

        } else if (calcHandValue(deckState.playerHand) == calcHandValue(deckState.dealerHand)) {
          dispatch(setWinner("tie"));
          console.log("TIE");
        } else {
          console.log("No conditions satisfied");
        }
      }
    }

  }, [gameState.isDealersTurn, deckState.dealerHand]);


  return (
    <>
      <div className="gameContainer">
        <div className="selectionArea">
          {deckState.loading == false ? (
            <>
              <h1>{gameState.gameStatus}</h1>
            </>
          ) : (
            <h1>Loading -- Give us a Moment</h1>
          )}

          {gameState.gameStatus.includes('Game not Initialized') ?
            //if true (game not initialized)

            <div className="buttons-sidepanel">
              <StartGameButton />

              {deckState.loading == false ? (
                <button onClick={handleScoreBoard}>Score</button>
              ) : (
                <button onClick={handleScoreBoard} disabled={true}>
                  Score
                </button>
              )}
            </div>
            :
            <div className='game-buttons'>
              <HitButton />
              <StandButton />
              <NextRound />
              <button onClick={handleQuit}>Quit</button>
            </div>
          }
        </div>

        <div className="playArea">
          <h1>Dealer</h1>

          <div className="dealContainer">
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

          <div className="userContainer">
            <h1>User</h1>
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
      </div>
    </>
  );
};
