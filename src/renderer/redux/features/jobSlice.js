import { createSlice } from '@reduxjs/toolkit';
import { jobApi } from '../services/job';
const initialState = {
  jobs: [],
  count: 0,
};

const jobSlice = createSlice({
  name: 'job',
  initialState,
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

export default jobSlice.reducer;
