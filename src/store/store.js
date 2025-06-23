import { configureStore } from "@reduxjs/toolkit";
import boardslice from "./boardslice"
import moveableslice from "./moveableslice"

const store= configureStore({
    reducer: {
        board: boardslice,
        moveable: moveableslice,
    },
})

export default store