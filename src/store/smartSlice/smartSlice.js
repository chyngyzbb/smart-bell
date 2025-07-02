import { createSlice } from "@reduxjs/toolkit";
import { fetchSmart, putSmart } from "../../API/api";

const initialState = {
  smart: [],
  loading: false,
  error: null,
};

const smartSlice = createSlice({
  name: "smart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSmart.fulfilled,(state,action)=>{
        state.loading=false
        state.smart=action.payload
    });
     builder.addCase(fetchSmart.pending,(state)=>{
        state.loading=true
    });

    builder.addCase(putSmart.fulfilled,(state,action)=>{
        state.smart=action.payload
    })
  }
});


export default smartSlice.reducer