import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import ActivateAccount from "./pages/activateAccount";
import CreatePost from "./pages/createPost";
import AllPosts from "./pages/allPosts";
import AllUsers from "./pages/allUsers";
import Messages from "./pages/messages";
import Analytics from "./pages/analistics";
import Chat from "./pages/chat";
import GroupChat from "./pages/groupChat";
import UsersForGroup from "./pages/usersForGroup";
import NavBar from "./components/common/NavBar";


function App() {
  return (
    <Router>
      <NavBar /> 
      <Routes>
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Register />} /> 
        <Route path="/activateAccount/:token" element={<ActivateAccount />} /> 
        <Route path="/createPost" element={<CreatePost />} /> 
        <Route path="/allPosts" element={<AllPosts />} /> 
        <Route path="/allUsers" element={<AllUsers />} /> 
        <Route path="/messagesForUser" element={<Messages />} />
        <Route path="/analistics" element={<Analytics />} /> 
        <Route path="/messages/:userId" element={<Chat />} />
        <Route path="/groupChat/:groupChatId" element={<GroupChat />} />
        <Route path="/usersForGroup/:groupId" element={<UsersForGroup />} />
      </Routes>
    </Router>
  );
}

export default App;