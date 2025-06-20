import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import ActivateAccount from "./pages/activateAccount";
import CreatePost from "./pages/createPost";
import AllPosts from "./pages/allPosts";
import AllUsers from "./pages/allUsers";
import Analytics from "./pages/analistics";
import Chat from "./pages/chat";
import GroupChat from "./pages/groupChat";
import UsersForGroup from "./pages/usersForGroup";
import NavBar from "./components/common/NavBar";
import AllGroupsUserIn from "./pages/allGroupsUserIn";
import ChattedUsers from "./pages/chattedUsers";
import UserProfile from "./pages/userProfile";
import PostDetails from "./pages/postDetails";
//import UserPostsProfile from "./pages/userPostsProfile";



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
        <Route path="/analistics" element={<Analytics />} /> 
        <Route path="/messages/:userId" element={<Chat />} />
        <Route path="/groupChat/:groupChatId" element={<GroupChat />} />
        <Route path="/usersForGroup/:groupId" element={<UsersForGroup />} />
        <Route path="/groups" element={<AllGroupsUserIn />} />
        <Route path="/chattedUsers" element={<ChattedUsers />} />
        <Route path="/userProfile/:userId" element={< UserProfile/>} />
        <Route path="/postDetails/:postId" element={< PostDetails/>} />
        
      </Routes>
    </Router>
  );
}

export default App;