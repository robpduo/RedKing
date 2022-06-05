import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getDealDealer, getDealPlayer } from '../../Slices/DeckSlice';
import {
  clearHands,
  setDealerCount,
  setGameStatus,
  setPlayerCount,
  setWinner,
  toggleDealerBust,
  toggleHandComplete,
  togglePlayerBusted,
} from '../../Slices/GameSlice';
import { AppDispatch, RootState } from '../../Store';

import {
  ValueCounter,
  calcCardValue,
  calcHandValue,
  calcVisibleDealerHandValue,
} from '../ValueCounter/ValueCounter';

export const HitButton: React.FC = () => {
  const userState = useSelector((state: RootState) => state.user);
  const deckState = useSelector((state: RootState) => state.deck);
  const gameState = useSelector((state: RootState) => state.game);

  const playerHand = useSelector((state: RootState) => state.deck.playerHand);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    console.log('Winner: ', gameState.winner);
  }, [gameState.winner]);

  useEffect(() => {
    console.log('Player Hand: ', playerHand);
    console.log('Player Hand Value: ', calcHandValue(playerHand));

    if (calcHandValue(playerHand) > 21) {
      //player busts, dealer automatically win
      dispatch(setWinner('dealer'));
      dispatch(togglePlayerBusted());
    } else if (calcHandValue(playerHand) == 21) {
      //player gets 21 TODO: turn should switch to dealer before setting game winner to player
      dispatch(setWinner('player')); //set winner to player
    } //TODO: Add condition where player stands
  }, [playerHand]);

  const handleHitButton = () => {
    dispatch(getDealPlayer(deckState.deck?.deckId));
  };

  return (
    <>
      {gameState.isPlayerBusted == true ||
      !gameState.winner.includes('none') ? (
        <button
          className="hit-button"
          disabled={true}
          onClick={handleHitButton}
        >
          Hit!
        </button>
      ) : (
        <button className="hit-button" onClick={handleHitButton}>
          Hit!
        </button>
      )}
    </>
  );
};
