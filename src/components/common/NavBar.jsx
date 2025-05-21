import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../styles/NavBar.css";
import { useAuth } from "../../context/AuthContext";

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const userId = user?.id;

  const formatRole = () => {
    if (!user) return "Guest";
    return user.role === "ROLE_ADMIN" ? "Admin" : "User";
  };

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect to login page after logout
  };

  const isActive = (path, exact = false) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-brand">OnlyBuns</div>

        <div className="navbar-links">
          {!user && (
            <>
              <Link to="/login" className={`nav-link ${isActive("/login", true) ? "active" : ""}`}>
                Login
              </Link>
              <Link to="/register" className={`nav-link ${isActive("/register", true) ? "active" : ""}`}>
                Register
              </Link>
              <Link to="/allPosts" className={`nav-link ${isActive("/allPosts", true) ? "active" : ""}`}>
                AllPosts
              </Link>
              <Link to="/allUsers" className={`nav-link ${isActive("/allUsers", true) ? "active" : ""}`}>
                AllUsers
              </Link>
            </>
          )}

          {user && (
            <>
              <Link to="/createPost" className={`nav-link ${isActive("/createPost", true) ? "active" : ""}`}>
                CreatePost
              </Link>
              <Link to="/allPosts" className={`nav-link ${isActive("/allPosts", true) ? "active" : ""}`}>
                AllPosts
              </Link>
              <Link to="/allUsers" className={`nav-link ${isActive("/allUsers", true) ? "active" : ""}`}>
                AllUsers
              </Link>
              <Link 
                to="/chattedUsers" 
                className={`nav-link ${isActive("/chattedUsers") ? "active" : ""}`}
              >
                Chat
              </Link>
              <Link 
                to="/groups" 
                className={`nav-link ${isActive("/groups") ? "active" : ""}`}
              >
                GroupChat
              </Link>
            </>
          )}

          {user?.role === "ROLE_ADMIN" && (
            <Link to="/analistics" className={`nav-link ${isActive("/analistics", true) ? "active" : ""}`}>
              Analytics
            </Link>
          )}

          {user && (
            <button onClick={handleLogout} className="nav-link logout-btn">
              Logout
            </button>
          )}
        </div>

        <div className="navbar-role">
          Role: <strong>{formatRole()}</strong>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;