import { configureStore } from "@reduxjs/toolkit";
import chatAppReducer from "./chatapp";

export const store = configureStore({
  reducer: {
    chatApp: chatAppReducer,
  },
});
