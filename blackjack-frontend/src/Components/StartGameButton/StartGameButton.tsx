import React from 'react'
import { Root } from 'react-dom/client';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { initializeDeck } from '../../Slices/DeckSlice';
import { setGameStatus } from '../../Slices/GameSlice';
import { AppDispatch, RootState } from '../../Store'

const StartGameButton: React.FC = () => {
  const userState = useSelector((state: RootState) => state.user);
  const deckState = useSelector((state: RootState) => state.deck);
  const gameState = useSelector((state:RootState) => state.game);

  const dispatch: AppDispatch = useDispatch();
  const navigator = useNavigate();

  const handleInitGame = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!userState.user) { //if user does not exist, return to login screen
      navigator('/login');
    } else {
      dispatch(initializeDeck(userState.user)); //initialize the game
      dispatch(setGameStatus('Game is Initialized'));//change the state of the game to initialized
    }
  }

  return (
    <button className="start-game-btn" onClick={handleInitGame}>Start</button>
  )
}

export default StartGameButton