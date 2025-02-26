import { configureStore } from "@reduxjs/toolkit";
import userReducers from "./slice/userSlice.js";


export const store = configureStore({
    reducer: {
        user: userReducers,
    },
});