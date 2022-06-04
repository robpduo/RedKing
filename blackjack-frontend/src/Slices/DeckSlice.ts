import storage from 'redux-persist/lib/storage';
import React from 'react';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ICard } from '../Interfaces/ICard';
import { IDeck } from '../Interfaces/IDeck';
import { IUser } from '../Interfaces/IUser';

import { PURGE } from 'redux-persist';

interface DeckSliceState {
  loading: boolean;
  error: boolean;
  isDeck: boolean;
  deck?: IDeck;
  cards?: ICard[];
  playerHand?: ICard[];
  dealerHand?: ICard[];
}

const initialDeckState: DeckSliceState = {
  loading: false,
  error: false,
  isDeck: false,
  deck: {},
};

/*
type userProfile = {
    id?: number | undefined,
    email: string | undefined,
    firstName: string | undefined,
    lastName: string | undefined,
    money: number | undefined
} 
*/

// from StartGameButton Component
export const initializeDeck = createAsyncThunk(
  'deck/initialize',
  async (user: IUser, thunkAPI) => {
    try {
      const res = await axios.post(
        'http://localhost:8000/deck/initialize',
        user
      );
      console.log('coming from async initializeDeck line 44 ', res.data);
      return res.data;
    } catch (e) {
      console.log(e);
    }
  }
);

// type deckid = {
//   deckId: number;
// };

// from StartGameButton Component
export const getDeck = createAsyncThunk(
  'deck/getDeck',
  async (deckId: number | undefined, thunkAPI) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/deck/getDeck/${deckId}`
      );
      console.log('coming from getDeck async line 63 ', res.data);
      return res.data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const getDeckByUID = createAsyncThunk(
  'deck/getDeckByUID',
  async (userId: number | undefined, thunkAPI) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/deck/getDeckByUID/${userId}`
      );
      console.log('coming from getDeckByUID async line 78 ', res.data);
      return res.data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const getDealPlayer = createAsyncThunk(
  'deck/getDealPlayer',
  async (deckId: number | undefined, thunkAPI) => {
    try {
      const res = await axios.get(`http://localhost:8000/deck/deal/${deckId}`);
      console.log('coming from getDealPlayer async line 92 ', res.data);
      return res.data;
    } catch (e) {
      console.log(e);
    }
  }
);
export const getDealDealer = createAsyncThunk(
  'deck/getDealDealer',
  async (deckId: number | undefined, thunkAPI) => {
    try {
      const res = await axios.get(`http://localhost:8000/deck/deal/${deckId}`);
      console.log('coming from getDealDealer async line 104 ', res.data);
      return res.data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const deckSlice = createSlice({
  name: 'deck',
  initialState: initialDeckState,
  reducers: {
    clearDeck: (state) => {
      state.deck = undefined;
      state.playerHand = undefined;
      state.dealerHand = undefined;
    },
  },
  extraReducers: (builder) => {
    //reducers for shuffling deck

    builder.addCase(initializeDeck.pending, (state, action) => {
      state.loading = true;
      state.isDeck = false;
    });
    builder.addCase(initializeDeck.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
      state.isDeck = false;
    });
    builder.addCase(initializeDeck.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.isDeck = true;
      state.deck = action.payload;
    });

    // reducers for deck
    builder.addCase(getDeck.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getDeck.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(getDeck.fulfilled, (state, action) => {
      state.deck = action.payload;
      state.loading = false;
      state.error = false;
    });

    //reducers for player Hand

    builder.addCase(getDealPlayer.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getDealPlayer.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(getDealPlayer.fulfilled, (state, action) => {
      state.playerHand = state.playerHand
        ? [...state.playerHand, action.payload]
        : action.payload;
      state.loading = false;
      state.error = false;
    });

    builder.addCase(PURGE, (state) => {
      storage.removeItem('root');
    });

    // reducers for Dealer Hand
    builder.addCase(getDealDealer.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getDealDealer.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(getDealDealer.fulfilled, (state, action) => {
      state.dealerHand = state.dealerHand
        ? [...state.dealerHand, action.payload]
        : action.payload;
      state.loading = false;
      state.error = false;
    });
  },
});

export const { clearDeck } = deckSlice.actions;

export default deckSlice.reducer;
