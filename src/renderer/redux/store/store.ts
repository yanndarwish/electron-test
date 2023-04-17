import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers/rootReducer';
import { authApi } from '../services/auth';
import { jobApi } from '../services/job';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, jobApi.middleware),
});

export default store;
