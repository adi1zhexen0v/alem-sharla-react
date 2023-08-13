import { createSlice } from '@reduxjs/toolkit';

interface CorrespondenceState {
  id: string;
}

const initialState: CorrespondenceState = {
  id: '',
};

export const correspondenceSlice = createSlice({
  name: 'correspondence',
  initialState,
  reducers: {
    setCorrespondenceId(state, action) {
      state.id = action.payload;
    },
    removeCorrespondenceId(state) {
      state.id = '';
    },
  },
});

export const { setCorrespondenceId, removeCorrespondenceId } =
  correspondenceSlice.actions;
export default correspondenceSlice.reducer;
