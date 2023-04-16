import { combineReducers } from 'redux';
import authSlice from '../features/authSlice';
import { authApi } from '../services/auth';

export default combineReducers({
  authSlice,
  [authApi.reducerPath]: authApi.reducer,
});
