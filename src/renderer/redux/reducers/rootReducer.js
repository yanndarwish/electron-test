import { combineReducers } from 'redux';
import authSlice from '../features/authSlice';
import jobSlice from '../features/jobSlice';
import { authApi } from '../services/auth';
import { jobApi } from '../services/job';

export default combineReducers({
  authSlice,
  jobSlice,
  [authApi.reducerPath]: authApi.reducer,
  [jobApi.reducerPath]: jobApi.reducer,
});
