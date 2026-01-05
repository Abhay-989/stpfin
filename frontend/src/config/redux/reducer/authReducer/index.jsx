import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../../action/authAction";

// Get token from localStorage
const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  loggedIn: !!token,
  message: "",
  token: token || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      state.user = null;
      state.loggedIn = false;
      state.isError = false;
      state.isSuccess = false;
      state.token = null;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "Logging in...";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.loggedIn = true;
        state.token = action.payload.token;
        state.message = "Login successful";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload || "Login failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
