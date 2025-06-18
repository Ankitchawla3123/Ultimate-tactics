import { configureStore } from "@reduxjs/toolkit";
import boardslice from "./boardslice"

const store= configureStore({
    reducer: {
        board: boardslice,
    },
})

export default store