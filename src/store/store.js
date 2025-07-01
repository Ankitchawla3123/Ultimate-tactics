import { configureStore } from "@reduxjs/toolkit";
import boardslice from "./boardslice";
import moveableslice from "./moveableslice";
import playerslice from "./playerslice";

const store = configureStore({
  reducer: {
    board: boardslice,
    moveable: moveableslice,
    player: playerslice,
  },
});

export default store;
