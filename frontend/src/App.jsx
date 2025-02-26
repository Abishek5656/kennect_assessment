import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";
import ProtectedRoute from "./pages/ProtectedRoute.jsx"; 

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
            <Route path="/login" element={<>Login Page</>} />
            <Route path="/signUp" element={<>Sign up Page</>} />
          
          </Routes>
        </BrowserRouter>
      </Suspense>
    </>
  );
}

export default App;
