import { configureStore } from "@reduxjs/toolkit";
import boardslice from "./boardslice";
import moveableslice from "./moveableslice";
import playerslice from "./playerslice";
import itemslice from "./extra"

const store = configureStore({
  reducer: {
    board: boardslice,
    moveable: moveableslice,
    player: playerslice,
    item: itemslice
  },
});

export default store;
