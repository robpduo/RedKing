import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getDealDealer, getDealPlayer } from '../../Slices/DeckSlice';
import { clearHands, setDealerCount, setGameStatus, setPlayerCount, setWinner, toggleDealerBust, toggleHandComplete, togglePlayerBusted } from '../../Slices/GameSlice';
import { AppDispatch, RootState } from '../../Store';
import {
  ValueCounter,
  calcCardValue,
  calcHandValue,
  calcVisibleDealerHandValue,
} from '../ValueCounter/ValueCounter';

export const HitButton: React.FC = () => {
  const userInfo = useSelector((state: RootState) => state.user);
  const deckInfo = useSelector((state: RootState) => state.deck);
  const playerHand = useSelector((state: RootState) => state.deck.playerHand);
  const dealerHand = useSelector((state: RootState) => state.deck.dealerHand);
  const gameInfo = useSelector((state:RootState) => state.game);
  const dispatch: AppDispatch = useDispatch();
  const navigator = useNavigate();

  useEffect(() => {
    setDealerCount(calcHandValue(dealerHand));
    setPlayerCount(calcHandValue(playerHand));
    let deckId = deckInfo.deck?.deckId;
    console.log("is black jack" + gameInfo.isBlackJack);
    console.log("is player busted " + gameInfo.isPlayerBusted);
    console.log("is dealer busted" + gameInfo.isDealerBusted);
    console.log("dealer hand value: " +calcHandValue(dealerHand));
    console.log("player hand value: " + calcHandValue(playerHand));
    if (gameInfo.dealerCount > 21) {
      toggleDealerBust();
      setWinner('player');
      toggleHandComplete();
      setGameStatus('player turn');
      clearHands();
      console.log(gameInfo.gameStatus);
    }
    if (gameInfo.dealerCount >= 17 && gameInfo.dealerCount < 22 && gameInfo.isDealersTurn) {
      if (gameInfo.dealerCount > gameInfo.playerCount) {
        setWinner('dealer');
        toggleHandComplete();
        setGameStatus('player turn');
        console.log(gameInfo.winner);
        console.log(gameInfo.gameStatus);
        clearHands();
      }
      if (gameInfo.dealerCount < gameInfo.playerCount && !gameInfo.isPlayerBusted) {
        setWinner('player');
        toggleHandComplete();
        gameInfo.gameStatus = "player turn";
        console.log(gameInfo.winner);
        console.log(gameInfo.gameStatus);
        clearHands();

      }
      if (gameInfo.dealerCount === gameInfo.playerCount && !gameInfo.isPlayerBusted) {
        setWinner('push');
        toggleHandComplete();
        setGameStatus('player turn');
        console.log(gameInfo.winner);
        console.log(gameInfo.gameStatus);
        clearHands();

      }
    }
    if (gameInfo.dealerCount < 17 && gameInfo.isDealersTurn && !gameInfo.isPlayerBusted) {
      setTimeout(() => {
        dispatch(getDealDealer(deckId));
      }, 500);
      setGameStatus('dealer turn');
      console.log(gameInfo.gameStatus);
      clearHands();
    }
  }, [playerHand, dealerHand]);

  const handleHitButton = () => {

    let deckId = deckInfo.deck?.deckId;

    if (userInfo && deckInfo) {
      toggleHandComplete();
      console.log(gameInfo.isHandComplete);
      dispatch(getDealPlayer(deckId));
      setGameStatus("player turn");
      console.log(gameInfo.gameStatus);
      if (gameInfo.playerCount > 21) {
        togglePlayerBusted();
        toggleDealerBust();
        setGameStatus('dealer turn');
        toggleHandComplete();
        setWinner("dealer");
        console.log(gameInfo.winner);
        calcHandValue(deckInfo.playerHand);

      }
    } else {
      setGameStatus('User not logged in');
      console.log(gameInfo.gameStatus);
    }
  };

  return (
    <>
      <button className="hit-button" onClick={handleHitButton}>
        Hit!
      </button>
    </>
  );
};
