import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import ActivateAccount from "./pages/activateAccount";
import CreatePost from "./pages/createPost";
import AllPosts from "./pages/allPosts";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Register />} /> 
        <Route path="/activateAccount/:token" element={<ActivateAccount />} /> 
        <Route path="/createPost" element={<CreatePost />} /> 
        <Route path="/allPosts" element={<AllPosts />} /> 
      </Routes>
    </Router>
  );
}

export default App;
