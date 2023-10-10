import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import correspondenceReducer from './slices/correspondenceSlise';
import feedbackReducer from './slices/feedbackSlice';
import greenCardApplicationsReducer from './slices/greenCardApplicationsSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    correspondence: correspondenceReducer,
    feedback: feedbackReducer,
    greenCardApplications: greenCardApplicationsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
