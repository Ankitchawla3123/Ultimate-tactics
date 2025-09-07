import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  aspect: '10 / 16', // DON'T KEEP THIS NULL , not handled 
  mode: "drag",
  drawtype: "line",
  LeftEnd: "left-end",
  RightEnd: "right-end",
  LineType: "plane",
  color: "#000000",
  menuselect: false,
  clearval: "",
  shortscreen: false, // 👈 NEW
};

const boardslice = createSlice({
  name: "board",
  initialState,
  reducers: {
    togglerotation: (state, action) => {
      state.aspect = action.payload;
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
    setmenutoggle: (state) => {
      state.menuselect = !state.menuselect;
    },
    setclearval: (state, action) => {
      state.clearval = action.payload;
    },
    setshortscreen: (state, action) => {
      // 👈 NEW
      state.shortscreen = action.payload;
    },
  },
});

export const {
  togglerotation,
  setmode,
  setdrawtype,
  setlinetype,
  setcolor,
  setmenutoggle,
  setclearval,
  setshortscreen, // 👈 NEW
} = boardslice.actions;

export default boardslice.reducer;
