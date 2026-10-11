import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import postReducer from "./postSlice";

// Configure the application's Redux store
const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
  },
});

export default store;
