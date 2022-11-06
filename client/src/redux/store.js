import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { alertSlice } from "./alerts";
import { facultySlice } from "./faculty";

const rootReducer = combineReducers({
  alert: alertSlice.reducer,
  faculty: facultySlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});
export default store;
