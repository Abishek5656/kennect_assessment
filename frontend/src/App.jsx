import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Suspense, useEffect } from "react";
import ProtectedRoute from "./pages/ProtectedRoute.jsx"; 
import {useSelector} from "react-redux";

import { user } from "./store/slice/userSlice.js"

const SignUp = React.lazy(() => import("./pages/SignUp.jsx"));
const Login = React.lazy(() => import("./pages/Login.jsx"));
const Homelayout = React.lazy(() => import("./pages/Homelayout.jsx"))


function App() {

  const userDetails = useSelector(user);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <Routes>
          <Route  path="/" element={
                <ProtectedRoute user={userDetails}>
                 <Homelayout />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
          
          </Routes>
        </BrowserRouter>
      </Suspense>
    </>
  );
}

export default App;
