import { createSlice } from "@reduxjs/toolkit";

// Initial authentication state
const initialState = {
  status: false,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Store authenticated user data
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload;
    },

    // Clear authentication state
    logout: (state) => {
      state.status = false;
      state.userData = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
