import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '../services/auth';

const initialState = {
  token: '',
  loggedIn: false,
  name: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        state.token = action.payload.token;
        state.name = action.payload.user.name;
        state.loggedIn = true;
      })
      .addMatcher(
        authApi.endpoints.register.matchFulfilled,
        (state, action) => {
          state.token = action.payload.token;
          state.name = action.payload.user.name;
          state.loggedIn = true;
        }
      );
  },
});

export default authSlice.reducer;
