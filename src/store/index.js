import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import taskReducer from "../redux/tasksSlice";

// const reducer = combineReducers({
  // here we will be adding reducers
// });
const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});
export default store;
