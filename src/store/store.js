 import smartReducer from "./slice/smartSlice";
 import muzReducer from './slice/muzSlice'
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    smart: smartReducer,
    muz:muzReducer

  }
});
