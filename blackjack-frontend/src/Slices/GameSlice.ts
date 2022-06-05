import React from "react";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface GameSliceState {
    gameStatus: string;
    dealerCount: number,    //dealer hand value
    playerCount: number,    //player hand value
    isDealersTurn: boolean,
    isDealerBusted: boolean,
    isHandComplete: boolean,
    isBlackJack: boolean,
    isPlayerBusted: boolean,
    winner: string
}

const initialGameState: GameSliceState = {
    gameStatus: 'Game not Initialized',
    dealerCount: 0,
    playerCount: 0,
    isDealersTurn: false,
    isDealerBusted: false,
    isHandComplete: true,
    isBlackJack: false,
    isPlayerBusted: false,
    winner: "none"
}


export const gameSlice = createSlice({
    name: 'game',
    initialState: initialGameState,
    reducers: {
        clearHands: (state) => {
            state.playerCount = 0;
            state.dealerCount = 0;
        },
        toggleDealerTurn: (state) => {
            state.isDealersTurn = !state.isDealersTurn;
        },
        toggleDealerBust: (state) => {
            state.isDealerBusted = !state.isDealerBusted;
        },
        toggleHandComplete: (state) => {
            state.isHandComplete = !state.isHandComplete;
        },
        toggleBlackJack: (state) => {
            state.isBlackJack = !state.isBlackJack;
        },
        togglePlayerBusted: (state) => {
            state.isPlayerBusted = !state.isPlayerBusted;
        },
        setWinner: (state, action) => {
            state.winner = action.payload;
        },
        setGameStatus: (state, action) => {
            state.gameStatus = action.payload;
        },
        setPlayerCount: (state, action)=>{
            state.playerCount = action.payload;
        },
        setDealerCount: (state, action)=>{
            state.dealerCount = action.payload;
        }
    }
});

export const {clearHands, setDealerCount, setPlayerCount, setGameStatus, setWinner, toggleBlackJack, toggleDealerBust, toggleDealerTurn, toggleHandComplete, togglePlayerBusted} = gameSlice.actions;

export default gameSlice.reducer;