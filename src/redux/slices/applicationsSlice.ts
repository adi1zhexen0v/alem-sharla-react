import { createSlice } from '@reduxjs/toolkit';
import { Application } from '../../utils/interfaces';
import { StatusTypes } from '../../utils/enums';

interface ApplicationsState {
  applicationsList: Application[];
  activeStatus: string;
  searchText: string;
}

const initialState: ApplicationsState = {
  applicationsList: [],
  activeStatus: StatusTypes.NEW,
  searchText: ''
};

export const applicationsSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    addApplications(state, action) {
      state.applicationsList = action.payload.map((app: { [x: string]: any; questionnaireIDs: any; }) => {
        const { questionnaireIDs, ...rest } = app;
        return rest;
      });
    },
    updateApplicationsStatus(state, action) {
      const { id, status } = action.payload;
      const applicationItem = state.applicationsList.find(item => item.id === id);
      if (applicationItem) {
        applicationItem.status = +status;
      }
    },
    updateApplicationsStatusType(state, action) {
      const { id, statusType } = action.payload;
      const applicationItem = state.applicationsList.find(item => item.id === id);
      if (applicationItem) {
        applicationItem.statusType = statusType;
      }
    },
    changeApplicationsActiveStatus(state, action) {
      state.activeStatus = action.payload;
    },
    changeApplicationsSearchText(state, action) {
      state.searchText = action.payload;
    }
  },
});

export const { addApplications, updateApplicationsStatus, updateApplicationsStatusType, changeApplicationsActiveStatus, changeApplicationsSearchText } = applicationsSlice.actions;
export default applicationsSlice.reducer;
