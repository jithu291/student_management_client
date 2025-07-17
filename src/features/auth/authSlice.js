import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

let token = localStorage.getItem("token");
let user = null;

if (token) {
  try {
    user = jwtDecode(token);
  } catch (err) {
    console.error("Invalid token:", err);
    token = null;
  }
}

const initialState = {
  token: token || null,
  user: user || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token } = action.payload;
      state.token = token;

      try {
        state.user = jwtDecode(token);
      } catch (err) {
        console.error("Failed to decode token:", err);
        state.user = null;
        state.token = null;
      }

      if (state.token) {
        localStorage.setItem("token", state.token);
      }
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
