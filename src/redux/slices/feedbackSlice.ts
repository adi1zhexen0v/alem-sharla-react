import { createSlice } from '@reduxjs/toolkit';
import { Feedback } from '../../utils/interfaces';
import { StatusTypes } from '../../utils/enums';

interface FeedbackState {
  feedbackList: Feedback[];
  activeStatus: string;
  searchText: string;
}

const initialState: FeedbackState = {
  feedbackList: [],
  activeStatus: StatusTypes.NEW,
  searchText: ''
};

export const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    addFeedback(state, action) {
      state.feedbackList = action.payload;
    },
    updateFeedbackStatus(state, action) {
      const { id, status } = action.payload;
      const feedbackItem = state.feedbackList.find(item => item.id === id);
      if (feedbackItem) {
        feedbackItem.status = status;
      }
    },
    changeFeedbackActiveStatus(state, action) {
      state.activeStatus = action.payload;
    },
    changeFeedbackSearchText(state, action) {
      state.searchText = action.payload;
    }
  },
});

export const { addFeedback, updateFeedbackStatus, changeFeedbackActiveStatus, changeFeedbackSearchText } = feedbackSlice.actions;
export default feedbackSlice.reducer;
