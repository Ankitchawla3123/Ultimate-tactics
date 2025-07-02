import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vertical: true,
  mode: "drag",
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
  },
});

export const { togglerotation, setmode } = boardslice.actions;

export default boardslice.reducer;
