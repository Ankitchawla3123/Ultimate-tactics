import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  drawing: false,
  dragging: false,
  polygondrawn: false,
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
    setpolydrawn: (state, action) => {
      state.polygondrawn = action.payload;
    },
  },
});

export const { draggingoff, draggingon, drawingoff, drawingon, setpolydrawn } =
  moveableslice.actions;

export default moveableslice.reducer;
