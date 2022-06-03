import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import React from 'react';
import axios from 'axios';
import { ICard } from '../Interfaces/ICard';
import { IDeck } from '../Interfaces/IDeck';
import { IUser } from '../Interfaces/IUser';

interface DeckSliceState {
  loading: boolean;
  error: boolean;
  isDeck: boolean;
  deck?: IDeck[];
  cards?: ICard[];
  playerHand?: ICard[];
  dealerHand?: ICard[];
}

const initialDeckState: DeckSliceState = {
  loading: false,
  error: false,
  isDeck: false,
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
      console.log('coming from async initializeDeck ', res.data);
      return res.data;
    } catch (e) {
      console.log(e);
    }
  }
);

type deckid = {
  deckId: number;
};

// from StartGameButton Component
export const getDeck = createAsyncThunk(
  'deck/getDeck',
  async (deckId: deckid, thunkAPI) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/deck/getDeck${deckId}`
      );
      console.log('coming from async getDeck line 55 ', res.data);
      return res.data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const getDealPlayer = createAsyncThunk(
  'deck/getDealPlayer',
  async (thunkAPI) => {
    try {
      const res = await axios.get('http://localhost:8000/deck/deal');
      console.log(res.data);
      return res.data;
    } catch (e) {
      console.log(e);
    }
  }
);
export const getDealDealer = createAsyncThunk(
  'deck/getDealDealer',
  async (thunkAPI) => {
    try {
      const res = await axios.get('http://localhost:8000/deck/deal');
      console.log(res.data);
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
      state.playerHand += action.payload;
      state.loading = false;
      state.error = false;
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
      state.dealerHand += action.payload;
      state.loading = false;
      state.error = false;
    });
  },
});

export const { clearDeck } = deckSlice.actions;

export default deckSlice.reducer;
