import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: "",
    password: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userDetails: (state, action) => {
            state.username = action.payload.username;
            state.password = action.payload.password;
        },
    },
});

export const selectUser = (state) => state.user; 

export const { userDetails } = userSlice.actions;

export default userSlice.reducer;
