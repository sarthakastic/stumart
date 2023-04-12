import { combineReducers } from "@reduxjs/toolkit";
import posts from "./productSlice";
import auth from "./authSlice";

const combinedReducers = combineReducers({
  posts,
  auth,
});

const rootReducer = (state, action) => {
  return combinedReducers(state, action);
};

export default rootReducer;
