import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null, 
    token: localStorage.getItem('token') || null
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    }
  }
})

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;
