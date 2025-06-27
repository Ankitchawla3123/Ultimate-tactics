import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    drawing: false,
    dragging: false,
    drawtype: "line",

};

const moveableslice= createSlice({
    name:"moveable",
    initialState,
    reducers:{
        drawingoff : (state) => {
            state.drawing = false
        },
        drawingon : (state) =>{
            state.drawing = true
        },
        draggingoff : (state) => {
            state.dragging = false
        },
        draggingon: (state) => {
            state.dragging = true;
        }
    
        
    },
    
});


export const {draggingoff, draggingon , drawingoff, drawingon} = moveableslice.actions;

export default moveableslice.reducer