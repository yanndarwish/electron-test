import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers/rootReducer';
import { authApi } from '../services/auth';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
