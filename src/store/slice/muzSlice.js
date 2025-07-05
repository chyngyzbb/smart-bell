import { createSlice } from "@reduxjs/toolkit"

const initialState=({
    muzOne:false,
    muzTwo:false,
    muzPause:true,
})

const muzSlice=createSlice({
    name:'muz',
    initialState,
    reducers:{
        muzOnePlay(state){
            state.muzOne=true
            state.muzStop=false
            state.muzTwo=false
        },
        muzTwoPlay(state){
            state.muzTwo=true
            state.muzStop=false
            state.muzOne=false
        },
        muzAllStop(state){
            state.muzPause=true
            state.muzOne=false
            state.muzTwo=false
        }
    }
})
export const {muzOnePlay,muzTwoPlay,muzAllStop}=muzSlice.actions
export default muzSlice.reducer
