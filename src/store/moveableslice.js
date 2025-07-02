import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  drawing: false,
  dragging: false,
  drawtype: "line",
};

const moveableslice = createSlice({
  name: "moveable",
  initialState,
  reducers: {
    drawingoff: (state) => {
      state.drawing = false;
    },
    drawingon: (state) => {
      state.drawing = true;
    },
    draggingoff: (state) => {
      state.dragging = false;
    },
    draggingon: (state) => {
      state.dragging = true;
    },
    setdrawtype: (state, action) => {
      state.drawtype = action.payload;
    },
  },
});

export const { draggingoff, draggingon, drawingoff, drawingon, setdrawtype } =
  moveableslice.actions;

export default moveableslice.reducer;
