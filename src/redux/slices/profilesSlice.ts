import { createSlice } from '@reduxjs/toolkit';
import { Profile } from '../../utils/interfaces';

interface ProfilesState {
  profilesList: Profile[];
  sort: string;
  searchText: string;
  isByEmail: boolean;
}

const initialState: ProfilesState = {
  profilesList: [],
  sort: '-name',
  searchText: '',
  isByEmail: false
};

export const profilesSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {
    addProfiles(state, action) {
      state.profilesList = action.payload;
    },
    changeProfilesSort(state, action) {
      state.sort = action.payload;
    },
    changeProfilesSearchText(state, action) {
      state.searchText = action.payload;
    },
    toggleProfilesIsByEmail(state, action) {
      state.isByEmail = action.payload;
    }
  },
});

export const { addProfiles, changeProfilesSort, changeProfilesSearchText, toggleProfilesIsByEmail } = profilesSlice.actions;
export default profilesSlice.reducer;
