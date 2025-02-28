import { configureStore } from "@reduxjs/toolkit";
import userReducers from "./slice/userSlice.js";
import postReducers from "./slice/postSlice.js"


export const store = configureStore({
    reducer: {
        user: userReducers,
        post: postReducers
    },
});