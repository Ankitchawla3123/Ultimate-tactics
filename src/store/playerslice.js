import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  PlayerOptions: [
    { number: 1, color: "#8B0000" },
    { number: 1, color: "#FFD700" },
    { number: 1, color: "#8A2BE2" },
    { number: 1, color: "#32CD32" },
    { number: 1, color: "#0000FF" },
    { number: 1, color: "#FF4500" },
    { number: 1, color: "#00CED1" },
    { number: 1, color: "#FFFFFF" },
    { number: 1, color: "#000000" },
  ],
  selectedplayer: null,
};

const playerslice = createSlice({
  name: "player",
  initialState,
  reducers: {
    addselectedplayer: (state, action) => {
      state.selectedplayer = action.payload;
    },
    resetselectedplayer: (state) => {
      state.selectedplayer = null;
    },
    plusone: (state, action) => {
      state.PlayerOptions = state.PlayerOptions.map((opt, index) => {
        if (index === action.payload) {
          return { ...opt, number: opt.number + 1 };
        }
        return opt;
      });
    },
  },
});

export const { addselectedplayer, resetselectedplayer, plusone } =
  playerslice.actions;
export default playerslice.reducer;
