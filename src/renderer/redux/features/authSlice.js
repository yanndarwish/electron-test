import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '../services/auth';

const initialState = {
  token: '',
  loggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        state.token = action.payload.token;
        state.loggedIn = true;
      })
      .addMatcher(
        authApi.endpoints.register.matchFulfilled,
        (state, action) => {
          state.token = action.payload.token;
          state.loggedIn = true;
        }
      );
  },
});

export default authSlice.reducer;
