import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage, getLocalStorageTwo, setLocalStorage, setLocalStorageTwo } from "../../LocalStorage/LocalStorage";
// import { fetchSmart, putSmart } from "../../API/api";

const initialState = {
  smart: getLocalStorage(),
  smartTwo: getLocalStorageTwo(),
  loading: false,
  error: null,
};

const smartSlice = createSlice({
  name: "smart",
  initialState,
  reducers: {
    getLocal(state){
     state.smart= getLocalStorage()
    },
     getLocalTwo(state){
     state.smartTwo= getLocalStorageTwo()
    },
    setLocal(state,action){
      state.smart=action.payload
      setLocalStorage(action.payload)
    },
    setLocalTwo(state,action){
      state.smartTwo=action.payload
      setLocalStorageTwo(action.payload)
    }
  },
  // extraReducers: (builder) => {
  //   builder.addCase(fetchSmart.fulfilled,(state,action)=>{
  //       state.loading=false
  //       state.smart=action.payload
  //   });
  //    builder.addCase(fetchSmart.pending,(state)=>{
  //       state.loading=true
  //   });

  //   builder.addCase(putSmart.fulfilled,(state,action)=>{
  //       state.smart=action.payload
  //   })
  // }
});

export const {setLocal,getLocal,setLocalTwo,getLocalTwo}=smartSlice.actions
export default smartSlice.reducer