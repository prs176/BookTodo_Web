import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import DetailPage from "./pages/DetailPage";
import LoginPage from "./pages/LoginPage";
import MyPage from "./pages/MyPage";
import RegisterPage from "./pages/RegisterPage";
import SerachPage from "./pages/SearchPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/search" element={<SerachPage />} />
        <Route path="/detail/:isbn" element={<DetailPage />} />
        <Route path="/" element={<MyPage />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
