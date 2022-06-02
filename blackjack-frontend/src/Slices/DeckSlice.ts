import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IDeck } from "../Interfaces/IDeck";

//Figure out our default state for this slice

interface UserSliceState {
    error: boolean;
    deck?: IDeck;
}

const initialUserState: UserSliceState = {
    error: false,
};

type userInfo = {
    id?: number;
    email: string;
    firstName: string;
    lastName: string;
    money: number
};

export const initializeDeck = createAsyncThunk(
    'deck/initialize',
    async (curUser: userInfo, thunkAPI) => {
        try {
            const res = await axios.post('http://localhost:8000/deck/initialize', curUser);
            console.log("HERE", res.data);
            return {
                id: res.data.deckId,
                user: res.data.userId,
                card: res.data.card,
                size: res.data.deckSize
            }
        } catch (e) {
            return thunkAPI.rejectWithValue('something went wrong');
        }
    }
);

// //Create the slice
export const UserSlice = createSlice({
    name: 'deck',
    initialState: initialUserState,
    reducers: {
        toggleError: (state) => {
            state.error = !state.error;
        },
    },

    extraReducers: (builder) => {

        builder.addCase(initializeDeck.fulfilled, (state, action) => {
            //The payload in this case, is the return from our asyncThunk from above
            state.deck = action.payload;
            // state.error = false;
        });

    },
});

export default UserSlice.reducer;
