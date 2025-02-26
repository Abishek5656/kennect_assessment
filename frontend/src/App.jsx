import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";



function App() {

  

  return (
    <>
     <Suspense fallback={<div>Loading...</div>}>
     <BrowserRouter>
        <Routes>

          <Route path="/login" element={<>Login Page</>} />
          <Route path="/signUp" element={<>Sign up Page</>} />
          <Route path="/" element={<>HomePage</>} />

        </Routes>
      </BrowserRouter>
     </Suspense>
     </>
  )
}

export default App
