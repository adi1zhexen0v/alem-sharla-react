import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import correspondenceReducer from './slices/correspondenceSlise';

const store = configureStore({
  reducer: {
    user: userReducer,
    correspondence: correspondenceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
