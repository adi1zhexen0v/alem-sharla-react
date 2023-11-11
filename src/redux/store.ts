import { configureStore } from '@reduxjs/toolkit';
import applicationsReducer from './slices/applicationsSlice';
import userReducer from './slices/userSlice';
import chatReducer from './slices/chatSlice';
import feedbackReducer from './slices/feedbackSlice';
import greenCardApplicationsReducer from './slices/greenCardApplicationsSlice';
import profilesReducer from './slices/profilesSlice';

const store = configureStore({
  reducer: {
    applications: applicationsReducer,
    user: userReducer,
    chat: chatReducer,
    feedback: feedbackReducer,
    greenCardApplications: greenCardApplicationsReducer,
    profiles: profilesReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
