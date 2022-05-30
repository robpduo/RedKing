import { configureStore } from '@reduxjs/toolkit';

//We would import our reducers from the slices we have to create
import userReducer from './Slices/UserSlice';
import deckReducer from './Slices/DeckSlice';

// inside index
export const Store = configureStore({
  reducer: {
    user: userReducer,
    deck: deckReducer,
    //game: gameReducer
  },
});

//We must export these two things to make our lives easier later
export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
