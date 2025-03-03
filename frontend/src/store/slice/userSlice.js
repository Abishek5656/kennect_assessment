import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const initialState = {
  username: "",
  token: "",
  userId: "",
  status: "",
};

const USER_URL = import.meta.env.VITE_BASE_URL;

const token = Cookies.get("accessToken");

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (initialUser) => {
    try {
      const response = await axios.post(
        `${USER_URL}/user/register`,
        initialUser
      );
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
    }
  }
);

export const userLogin = createAsyncThunk(
  "user/userLogin",
  async (initialuser) => {
    try {
      const response = await axios.post(`${USER_URL}/user/login`, initialuser);
      console.log("response", response);
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      console.error("Error:", error);
    }
  }
);

export const userLogout = createAsyncThunk(
  "user/userLogout",
  async (initialuser) => {
    try {
      const response = await axios.post(`${USER_URL}/user/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("response logout-", response);
      return response;
    } catch (error) {}
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userDetails: (state, action) => {
    },
  },
  extraReducers(builder) {
    builder
      .addCase(userLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (state.status === "succeeded") {
          Cookies.set("accessToken", action.payload.token, {
            expires: 1,
            path: "/",
          });
          localStorage.setItem("username", action.payload.data.username);
          localStorage.setItem("token", action.payload.token);
        }
        state.username = action.payload.data.username;
        state.token = action.payload.token;
        state.userId = action.payload.data._id;
      })
      .addCase(userLogout.fulfilled, (state, action) => {
        state.status = "succeeded";

        console.log("action->", action);
        console.log("action.payload", action.payload);

        if (state.status === "succeeded") {
            console.log("inside the!!") 
          Cookies.remove("accessToken");
          localStorage.removeItem("username");
          localStorage.removeItem("token");
        }

        state.username = "";
        state.token = "";
        state.userId = "";
      });
  },
});

export const user = (state) => state.user;

export const { userDetails } = userSlice.actions;

export default userSlice.reducer;
