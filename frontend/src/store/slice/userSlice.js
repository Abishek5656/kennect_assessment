import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    username =  "",
    password = "",
];

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userDetails: (state, action) => {
            state.username = action.username,
            state.username = action.password,
        },
    },
});


export const selectAllmenu = (state) => state.user;

export const { userDetails } = userSlice.actions;

export default userSlice.reducer;