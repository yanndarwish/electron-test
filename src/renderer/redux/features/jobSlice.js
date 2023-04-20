import { createSlice } from '@reduxjs/toolkit';
import { jobApi } from '../services/job';

const initialState = {
  jobs: [],
  count: 0,
  toRevive: [],
  ignoreRevive: false
};

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    addToRevive: (state, action) => {
      state.toRevive.push(action.payload);
    },
    resetToRevive: (state, action) => {
      state.toRevive = [];
    },
    setIgnoreRevive: (state, action) => {
      state.ignoreRevive = true;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      jobApi.endpoints.getAllJobs.matchFulfilled,
      (state, action) => {
        state.jobs = action.payload.jobs;
        state.count = action.payload.count;
      }
    );
  },
});

export const { addToRevive, resetToRevive, setIgnoreRevive } = jobSlice.actions;
export default jobSlice.reducer;
