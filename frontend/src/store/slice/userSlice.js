import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: "",
    token: "",
    userId:""
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userDetails: (state, action) => {
            state.username = action.payload.data.username;
            state.token = action.payload.token;
            state.userId = action.payload.data._id;
        },
    },
});

export const user = (state) => state.user; 

export const { userDetails } = userSlice.actions;

export default userSlice.reducer;
