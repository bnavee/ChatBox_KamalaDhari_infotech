import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
};

export const chatAppSlice = createSlice({
  name: "chatApp",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    logout: (state) => {
      state.user = undefined;
      state.messages = [];
    },
  },
});

export const { setUser, setMessages, logout } = chatAppSlice.actions;
export const selectUser = (state) => state.chatApp?.user;
export const selectMessages = (state) => state.chatApp?.messages;

export default chatAppSlice.reducer;
