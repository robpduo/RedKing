import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IUser } from '../../Interfaces/IUser';
import {
  getDealDealer,
  getDealPlayer,
  getDeck,
  initializeDeck,
  deckSlice,
} from '../../Slices/DeckSlice';
import { AppDispatch, RootState } from '../../Store';

// go inside PlayGame
export const StartGameButton: React.FC = () => {
  const userInfo = useSelector((state: RootState) => state.user);

  const deckInfo = useSelector((state: RootState) => state.deck.deck);

  const playerHand = useSelector((state: RootState) => state.deck.playerHand);

  const dealerHand = useSelector((state: RootState) => state.deck.dealerHand);

  const [gameStatus, setGameStatus] = useState('Game not initialized');
  const dispatch: AppDispatch = useDispatch();
  const navigator = useNavigate();

  console.log('coming from StartGameButton line 27 ', deckInfo);

  const handleGameInit = () => {
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

    console.log('coming from StartGameButton line 38 ', userInfo.user);

    // if (userInfo != null) {
    //
    // }

    //retrieve deck from database
    // dispatch(getDeck(deckInfo && deckInfo));

    //deals out initial 4 cards to player and dealer
    dispatch(getDealPlayer);
    dispatch(getDealPlayer);
    dispatch(getDealDealer);
    dispatch(getDealDealer);
    console.log(playerHand);
    console.log(dealerHand);
    setGameStatus('begin');
  };

  return (
    <>
      {gameStatus.includes('Game not initialized') ? (
        <div className="startGameBtnContainer">
          <button className="startGameBtn" onClick={handleGameInit}>
            Start Game
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
