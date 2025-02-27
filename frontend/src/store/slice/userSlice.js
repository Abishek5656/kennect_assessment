import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: "",
    token: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userDetails: (state, action) => {
            // console.log("action0->", action)
            state.username = action.payload.data.username;
            state.token = action.payload.token;
        },
    },
});

export const user = (state) => state.user; 

export const { userDetails } = userSlice.actions;

export default userSlice.reducer;
