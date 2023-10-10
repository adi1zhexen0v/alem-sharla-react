import { createSlice } from '@reduxjs/toolkit';
import { GreenCardApplication } from '../../utils/interfaces';

interface GreenCardApplicationsState {
  greenCardApplicationsList: GreenCardApplication[];
  activeStatus: string;
  searchText: string;
}

const initialState: GreenCardApplicationsState = {
  greenCardApplicationsList: [],
  activeStatus: 'new',
  searchText: ''
};

export const greenCardApplicationsSlice = createSlice({
  name: 'greenCardApplications',
  initialState,
  reducers: {
    addGCApplications(state, action) {
      state.greenCardApplicationsList = action.payload;
    },
    updateGCApplicationsStatus(state, action) {
      const { id, status } = action.payload;
      const feedbackItem = state.greenCardApplicationsList.find(item => item.id === id);
      if (feedbackItem) {
        feedbackItem.status = status;
      }
    },
    changeGCApplicationsActiveStatus(state, action) {
      state.activeStatus = action.payload;
    },
    changeGCApplicationsSearchText(state, action) {
      state.searchText = action.payload;
    }
  },
});

export const { addGCApplications, updateGCApplicationsStatus, changeGCApplicationsActiveStatus, changeGCApplicationsSearchText } = greenCardApplicationsSlice.actions;
export default greenCardApplicationsSlice.reducer;
