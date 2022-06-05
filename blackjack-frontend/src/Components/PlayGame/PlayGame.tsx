import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './PlayGame.css';
import { IDeck } from '../../Interfaces/IDeck';
import heartKing from '../../images/HEARTSKING.png';

import { AppDispatch, RootState } from '../../Store';
import StartGameButton from '../StartGameButton/StartGameButton';
import { HitButton } from '../HitButton/HitButton';

import { setGameStatus, togglePlayerBusted } from '../../Slices/GameSlice';
import { quitGame } from '../../Slices/DeckSlice';
import { StandButton } from '../StandButton/StandButton';

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
    dispatch(togglePlayerBusted());
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
              <button onClick={handleQuit}>Quit</button>
            </div>
          )}
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
