import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import correspondenceReducer from './slices/correspondenceSlise';
import feedbackReducer from './slices/feedbackSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    correspondence: correspondenceReducer,
    feedback: feedbackReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
