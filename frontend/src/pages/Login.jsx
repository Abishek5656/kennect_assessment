import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { userDetails } from "../store/slice/userSlice.js";
import Cookies from "js-cookie";
import { BASE } from "../constant/index.js"

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {

    if (!username.trim() || !password.trim()) {
      toast.error("Username and Password are required");
      return;
    }

    try {

      const res = await fetch(`${BASE}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.success) {
        dispatch(userDetails(data));
        navigate("/");
        Cookies.set("accessToken", data.token, { expires: 1, path: "/" });
        localStorage.setItem("username", data.data.username);
        localStorage.setItem("token", data.token);
        toast.success(data.message);
      } else {
        toast.error(data.message || "Invalid credentials");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
          onClick={handleLogin}
        >
          Sign In
        </button>

        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/signUp")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
