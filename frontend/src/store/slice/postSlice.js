import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: []
};

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        postDetails: (state, action) => {            
            state.posts = action.payload; 
        },
        addPostDetails: (state, action) => {
            state.posts = [action.payload, ...state.posts];
        }
    },
});

export const selectPosts = (state) => state.post.posts; 

export const { postDetails, addPostDetails } = postSlice.actions;

export default postSlice.reducer;
