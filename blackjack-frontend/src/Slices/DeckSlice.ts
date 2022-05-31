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
    password: string;
    fName: string;
    lName: string;
    money: number
};

export const loginUser = createAsyncThunk(
    'deck/initialize',
    async (curUser: userInfo, thunkAPI) => {
        try {
            const res = await axios.post('http://localhost:8000/deck/initialize', curUser);
            console.log(res.data);
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

    },
});

export default UserSlice.reducer;
