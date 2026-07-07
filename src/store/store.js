import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";

// Configure the application's Redux store
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
