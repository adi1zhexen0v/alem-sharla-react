import { createSlice } from '@reduxjs/toolkit'

interface UserState {
  name: string;
  email: string;
  token: string;
  id: string;
}

const initialState: UserState = {
  name: '',
  email: '',
  token: '',
  id: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    removeUser(state) {
      state.name = '';
      state.email = '';
      state.token = '';
      state.id = '';
    },
  },
})

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;