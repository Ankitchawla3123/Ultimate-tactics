import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    vertical: true,

};

const boardslice= createSlice({
    name:"board",
    initialState,
    reducers:{
        togglerotation: (state, action)=>{
            state.vertical= action.payload;
        }
    },
    
});


export default boardslice.reducer