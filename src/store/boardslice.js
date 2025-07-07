import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vertical: true,
  mode: "drag",
  drawtype: "line",
  LeftEnd: "left-end",
  RightEnd: "right-end",
  LineType: "plane",
  color: "#000000",
};

const boardslice = createSlice({
  name: "board",
  initialState,
  reducers: {
    togglerotation: (state, action) => {
      state.vertical = action.payload;
    },
    setmode: (state, action) => {
      state.mode = action.payload;
    },
    setdrawtype: (state, action) => {
      state.drawtype = action.payload;
    },
    setlinetype: (state, action) => {
      if (action.payload.includes("left")) {
        state.LeftEnd = action.payload;
      } else if (action.payload.includes("right")) {
        state.RightEnd = action.payload;
      } else {
        state.LineType = action.payload;
      }
    },
    setcolor: (state, action) => {
      state.color = action.payload;
    },
  },
});

export const { togglerotation, setmode, setdrawtype, setlinetype, setcolor } =
  boardslice.actions;

export default boardslice.reducer;
