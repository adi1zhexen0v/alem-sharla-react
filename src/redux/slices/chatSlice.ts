import { createSlice } from '@reduxjs/toolkit';
import { Correspondence } from '../../utils/interfaces';
import { StatusTypes } from '../../utils/enums';

interface ChatState {
  activeStatus: string;
  chatList: Correspondence[];
  searchText: string;
}

const initialState: ChatState = {
  activeStatus: StatusTypes.NEW,
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
    },
    changeChatIsCompleted(state, action) {
      const { id, isCompleted } = action.payload;
      const correspondence = state.chatList.find(item => item.id === id);
      correspondence!.isCompleted = isCompleted;
    }
  },
});

export const { setChat, changeChatActiveStatus, changeChatSearchText, changeChatIsCompleted } = correspondenceSlice.actions;
export default correspondenceSlice.reducer;
