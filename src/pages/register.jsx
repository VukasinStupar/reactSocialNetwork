import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    surname: "",
    username: "",
    adress: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const onRegisterClickHandler = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:8080/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.status === 409) {
      return window.alert("Username already exists!");
    }

    if (!response.ok) {
      return window.alert("Error during registration!");
    }

    window.alert("Registration successful! Please check your email to activate your account.");
    navigate("/login");
  };

  return (
    <div className="register-form-container">
      <div className="register-form-wrapper">
        <form className="register-form" onSubmit={onRegisterClickHandler}>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              onChange={handleChange}
              name="name"
              type="text"
              value={user.name}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="surname">Surname</label>
            <input
              onChange={handleChange}
              name="surname"
              type="text"
              value={user.surname}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              onChange={handleChange}
              name="username"
              type="text"
              value={user.username}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="address">Address</label>
            <input
              onChange={handleChange}
              name="adress"
              type="text"
              value={user.adress}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              name="email"
              type="email"
              value={user.email}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              name="password"
              type="password"
              value={user.password}
              required
            />
          </div>

          <div className="button-group">
            <button type="submit">Register</button>
            <button type="button" onClick={() => navigate("/login")}>
              Already have an account?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
