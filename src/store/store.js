 import smartReducer from "./smartSlice/smartSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    smart: smartReducer
  }
});
