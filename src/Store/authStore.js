import { configureStore } from "@reduxjs/toolkit";
import authReducers from "./authSlice";
import todoReducers from "./todoSlice";
export const authStore = configureStore({
  reducer: {
    auth: authReducers,
    todo: todoReducers,
  },
});
