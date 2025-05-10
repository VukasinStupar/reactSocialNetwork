// components/common/NavBar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../../styles/NavBar.css";  

const NavBar = () => {
  const location = useLocation();

  const navLinks = [
    { name: "Register", path: "/register" },
    { name: "LogIn", path: "/login" },
    { name: "CreatePost", path: "/createPost" },
    { name: "AllPosts", path: "/allPosts" },
    { name: "AllUsers", path: "/allUsers" },
    { name: "Analitistics", path: "/analistics" },
    { name: "GroupChat", path: "/groupChat" },
    { name: "Messages", path: "/messages" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-brand">OnlyBuns</div>
        <ul className="navbar-links">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                className={location.pathname === link.path ? "active" : ""}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
