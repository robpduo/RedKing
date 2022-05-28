import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IUser } from '../Interfaces/IUser';

//Figure out our default state for this slice

interface UserSliceState {
  user?: IUser;
}

const initialUserState: UserSliceState = {
  // error: false,
  // loading: true,
};

type Login = {
  email: string;
  password: string;
};

// called from LoginForm component
export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials: Login, thunkAPI) => {
    try {
      // axios.defaults.withCredentials = true;
      const res = await axios.post(
        'http://localhost:8000/user/login',
        credentials
      );

      console.log('coming from line 32 ', res.data);

      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);

// // export const logoutUser = createAsyncThunk(
// //     'user/logout',
// //     async (thunkAPI) => {
// //         try {
// //             axios.defaults.withCredentials = true;
// //             const res = await axios.put('http://localhost:8000/users/logout');
// //             window.location.reload();
// //         } catch (e) {
// //         }
// //     }
// // )

// //Create the slice
export const UserSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    toggleError: (state) => {
      //   state.error = !state.error;
    },
  },

  extraReducers: (builder) => {
    // //This is where we would create our reducer logic
    // builder.addCase(loginUser.pending, (state, action) => {
    //   // state.loading = true;
    // });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      //The payload in this case, is the return from our asyncThunk from above
      state.user = action.payload;
      // state.error = false;
      // state.loading = false;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      // state.error = true;
      // state.loading = false;
    });
  },
});

// //If we had normal actions and reducers we would export them like this
// export const { toggleError } = UserSlice.actions;

export default UserSlice.reducer;
