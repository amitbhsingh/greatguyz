
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../redux/store';

interface User {
 name: string;
 email: string;
 created:Date;
}
interface GoogleUser{
  name:string;
  email:string;
  googleId:string;
  token:string;
  created?: Date;
  
}
export type UsersCombined= User | GoogleUser;

interface AuthState {
 isAuthenticated: boolean;
 user: UsersCombined | null;
 isGoogleAuth:boolean;
}

const initialState: AuthState = {
 isAuthenticated: false,
 user: null,
 isGoogleAuth:false,
};

export const authSlice = createSlice({
 name: 'auth',
 initialState,
 reducers: {
    logIn: (state, action: { payload: User }) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    googleLogIn: (state, action: {payload: GoogleUser}) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.isGoogleAuth = true; // Set to true for Google logins
    },
    clearUser: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
 },
});

export const { logIn, googleLogIn, clearUser } = authSlice.actions;
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectIsGoogleAuth = (state: RootState) => state.auth.isGoogleAuth;
export default authSlice.reducer;




// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import type { RootState } from '../../redux/store';

// interface User {
//   name: string;
//   email: string;
//   created: Date;
// }
// interface GoogleUser {
//   name: string;
//   email: string;
//   googleId: string;
//   token: string;
//   created?: Date;
// }
// export type UsersCombined = User | GoogleUser;

// interface AuthState {
//   isAuthenticated: boolean;
//   user: UsersCombined | null;
//   isGoogleAuth: boolean;
// }

// const initialState: AuthState = {
//   isAuthenticated: false,
//   user: null,
//   isGoogleAuth: false,
// };

// // Asynchronous thunks
// export const logIn = createAsyncThunk(
//   'auth/logIn',
//   async (userData: { email: string; password: string }, thunkAPI) => {
//     try {
//       const response = await axios.post('/api/login', userData);
//       // The response should include user data and authentication status
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );

// export const googleLogIn = createAsyncThunk(
//   'auth/googleLogIn',
//   async (token: string, thunkAPI) => {
//     try {
//       const response = await axios.post('/api/auth/google', { token });
//       // The response should include user data and authentication status
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );

// export const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     clearUser: (state) => {
//       state.isAuthenticated = false;
//       state.user = null;
//       state.isGoogleAuth = false;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(logIn.fulfilled, (state, action) => {
//         state.isAuthenticated = true;
//         state.user = action.payload;
//         state.isGoogleAuth = false;
//       })
//       .addCase(googleLogIn.fulfilled, (state, action) => {
//         state.isAuthenticated = true;
//         state.user = action.payload;
//         state.isGoogleAuth = true;
//       })
//       .addCase(logIn.rejected, (state) => {
//         // Handle the case where login fails
//         state.isAuthenticated = false;
//         state.user = null;
//         state.isGoogleAuth = false;
//       })
//       .addCase(googleLogIn.rejected, (state) => {
//         // Handle the case where Google login fails
//         state.isAuthenticated = false;
//         state.user = null;
//         state.isGoogleAuth = false;
//       });
//   },
// });

// export const { clearUser } = authSlice.actions;

// export const selectUser = (state: RootState) => state.auth.user;
// export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
// export const selectIsGoogleAuth = (state: RootState) => state.auth.isGoogleAuth;

// export default authSlice.reducer;
