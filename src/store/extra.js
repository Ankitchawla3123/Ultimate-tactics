import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selecteditem: null,
};

const itemslice = createSlice({
  name: "item",
  initialState,
  reducers: {
    addselectedItem: (state, action) => {
      state.selecteditem = action.payload;
    },
    resetselectedItem: (state) => {
      state.selecteditem = null;
    },
  },
});

export const { addselectedItem, resetselectedItem } = itemslice.actions;
export default itemslice.reducer;
