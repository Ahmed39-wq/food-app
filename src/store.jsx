import { configureStore, combineReducers } from "@reduxjs/toolkit";
import foodSlice from "./feature/foodSlice";

const reducer = combineReducers({
  food: foodSlice,
});

export const store = configureStore({
  reducer,
});
