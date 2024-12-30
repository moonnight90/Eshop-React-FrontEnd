import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  is_login: localStorage.getItem("is_login") === "true" ? true : false,
  user_token: JSON.parse(localStorage.getItem("user_token") || "{}"),
  user: JSON.parse(localStorage.getItem("user") || "{}"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.is_login = true;      
      state.user_token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem("is_login", "true");
      localStorage.setItem("user_token", JSON.stringify(action.payload.token));
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.is_login = false;
      state.user_token = null;
      state.user = null;
      localStorage.removeItem("is_login");
      localStorage.removeItem("user_token");
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
