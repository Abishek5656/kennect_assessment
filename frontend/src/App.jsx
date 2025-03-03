import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { Suspense } from "react";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import { useSelector } from "react-redux";

import { user } from "./store/slice/userSlice.js";

const SignUp = React.lazy(() => import("./pages/SignUp.jsx"));
const Login = React.lazy(() => import("./pages/Login.jsx"));
const Homelayout = React.lazy(() => import("./pages/Homelayout.jsx"));


function App() {
  const userDetails = useSelector(user);
  const token = localStorage.getItem("token"); 
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              !token ? (
                <Navigate to="/login" />
              ) : (
                <ProtectedRoute user={userDetails}>
                  <Homelayout />
                </ProtectedRoute>
              )
            }
          />

          {/* Login Route */}
          <Route
            path="/login"
            element={token ? <Navigate to="/" /> : <Login />}
          />

          {/* SignUp Route */}
          <Route
            path="/signup"
            element={token ? <Navigate to="/" /> : <SignUp />}
          />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
