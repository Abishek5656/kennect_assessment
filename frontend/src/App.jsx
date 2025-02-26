import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";
import ProtectedRoute from "./pages/ProtectedRoute.jsx"; 

const SignUp = React.lazy(() => import("./pages/singup.jsx"));
const Login = React.lazy(() => import("./pages/Login.jsx"));

function App() {
  const user = false;

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <Routes>
          <Route  path="/" element={
                <ProtectedRoute user={user}>
                  <>Home Page (Protected)</>
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
