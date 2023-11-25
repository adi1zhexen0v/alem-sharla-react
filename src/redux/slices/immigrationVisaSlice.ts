import { createSlice } from '@reduxjs/toolkit';
import { ImmigrationVisa } from '../../utils/interfaces';
import { StatusTypes } from '../../utils/enums';

interface ImmigrationVisasState {
  immigrationVisasList: ImmigrationVisa[];
  activeStatus: string;
}

const initialState: ImmigrationVisasState = {
  immigrationVisasList: [],
  activeStatus: StatusTypes.NEW
};

export const immigrationVisasSlice = createSlice({
  name: 'immigrationVisas',
  initialState,
  reducers: {
    addImmigrationVisas(state, action) {
      state.immigrationVisasList = action.payload;
    },
    changeImmigrationVisasActiveStatus(state, action) {
      state.activeStatus = action.payload;
    },
    updateImmigrationVisaStatus(state, action) {
      const { id, status } = action.payload;
      const immigrationVisa = state.immigrationVisasList.find(item => item.id === id);
      if (immigrationVisa) {
        immigrationVisa.status = status;
      }
    }
  },
});

export const { addImmigrationVisas, changeImmigrationVisasActiveStatus, updateImmigrationVisaStatus } = immigrationVisasSlice.actions;
export default immigrationVisasSlice.reducer;
