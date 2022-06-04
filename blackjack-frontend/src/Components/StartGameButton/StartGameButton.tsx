import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IUser } from '../../Interfaces/IUser';
import {
  getDealDealer,
  getDealPlayer,
  getDeck,
  initializeDeck,
} from '../../Slices/DeckSlice';
import { AppDispatch, RootState } from '../../Store';

// go inside PlayGame
export const StartGameButton: React.FC = () => {
  const userInfo = useSelector((state: RootState) => state.user);
  const deckInfo = useSelector((state: RootState) => state.deck);
  const gameInfo = useSelector((state:RootState) => state.game);
  const playerHand = useSelector((state: RootState) => state.deck.playerHand);
  const dealerHand = useSelector((state: RootState) => state.deck.dealerHand);
  const [gameStatus, setGameStatus] = useState('Game not initialized');
  const dispatch: AppDispatch = useDispatch();
  const navigator = useNavigate();

  const handleGameInit = () => {
    //navigator('/PlayGamePage');
    if (userInfo.user) {
      // init and shuffle deck
      let user: IUser = {
        userId: userInfo.user?.userId,
        email: userInfo.user?.email,
        password: userInfo.user?.password,
        firstName: userInfo.user?.firstName,
        lastName: userInfo.user?.lastName,
        money: userInfo.user?.money,
      };

      dispatch(initializeDeck(user));
    }

    console.log(userInfo.user);

    // if (userInfo != null) {
    //
    // }

    let deckId = deckInfo.deck?.deckId;
    //retrieve deck from database
    dispatch(getDeck(deckId));

    //deals out initial 4 cards to player and dealer
    dispatch(getDealPlayer(deckId));
    dispatch(getDealPlayer(deckId));
    dispatch(getDealDealer(deckId));
    dispatch(getDealDealer(deckId));

    console.log(playerHand);
    console.log(dealerHand);
    console.log(gameInfo.gameStatus);

    setGameStatus('begin');
    console.log(gameInfo.gameStatus);
  };

  return (
    <>
      {gameStatus.includes('Game not initialized') ? (
        <div className="start-game-btn-container">
          {
            <button className="start-game-btn" onClick={handleGameInit}>
              Start Game
            </button>
          }
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
