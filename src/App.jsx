import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import ActivateAccount from "./pages/activateAccount";
import CreatePost from "./pages/createPost";
import AllPosts from "./pages/allPosts";
import AllUsers from "./pages/allUsers";
import Messages from "./pages/messages";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Register />} /> 
        <Route path="/activateAccount/:token" element={<ActivateAccount />} /> 
        <Route path="/createPost" element={<CreatePost />} /> 
        <Route path="/allPosts" element={<AllPosts />} /> 
        <Route path="/allUsers" element={<AllUsers />} /> 
        <Route path="/messagesForUser" element={<Messages />} /> 
      </Routes>
    </Router>
  );
}

export default App;