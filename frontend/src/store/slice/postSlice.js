import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const initialState = {
  posts: [],
};

const POST_URL = import.meta.env.VITE_BASE_URL;

const token = Cookies.get("accessToken");

export const createPost = createAsyncThunk(
  "post/createPost",
  async (initialPost) => {
    try {
      const response = await axios.post(
        `${POST_URL}/post/create`,
        initialPost,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchPost = createAsyncThunk("post/fetchPost", async () => {
  try {
    const response = await axios.get(`${POST_URL}/post/allposts`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
});

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    // postDetails: (state, action) => {
    //   state.posts = action.payload;
    // },
    // addPostDetails: (state, action) => {
    //   state.posts = [action.payload, ...state.posts];
    // },
  },
  extraReducers(builder) {
    builder
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.push(action.payload.data);
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        console.log(action);
        const posts = action.payload.data;
        const orderPostData = posts.sort((a, b) => b.createdAt - a.createdAt);
        state.posts = [...orderPostData];
      });
  },
});

export const allPostsDetails = (state) => state.post.posts;

export const { postDetails, addPostDetails } = postSlice.actions;

export default postSlice.reducer;
