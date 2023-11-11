import { createSlice } from '@reduxjs/toolkit';
import { Correspondence } from '../../utils/interfaces';

interface ChatState {
  activeStatus: string;
  chatList: Correspondence[];
  searchText: string;
}

const initialState: ChatState = {
  activeStatus: 'new',
  chatList: [],
  searchText: ''
};

export const correspondenceSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChat(state, action) {
      state.chatList = action.payload;
    },
    changeChatActiveStatus(state, action) {
      state.activeStatus = action.payload;
    },
    changeChatSearchText(state, action) {
      state.searchText = action.payload;
    }
  },
});

export const { setChat, changeChatActiveStatus, changeChatSearchText } = correspondenceSlice.actions;
export default correspondenceSlice.reducer;
