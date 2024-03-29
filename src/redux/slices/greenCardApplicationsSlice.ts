import { createSlice } from '@reduxjs/toolkit';
import { GreenCardApplication } from '../../utils/interfaces';
import { StatusTypes } from '../../utils/enums';

interface GreenCardApplicationsState {
  greenCardApplicationsList: GreenCardApplication[];
  activeStatus: string;
  searchText: string;
}

const initialState: GreenCardApplicationsState = {
  greenCardApplicationsList: [],
  activeStatus: StatusTypes.NEW,
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
      const greenCardApplicationItem = state.greenCardApplicationsList.find(item => item.id === id);
      if (greenCardApplicationItem) {
        greenCardApplicationItem.status = status;
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
