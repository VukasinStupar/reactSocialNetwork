import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/forms.css";   
import { registerUser } from "../services/AuthService";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    surname: "",
    username: "",
    address: "",
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

    try {
      await registerUser(user); 
      window.alert("Registration successful! Please check your email to activate your account.");
      navigate("/login");
    } catch (error) {
      window.alert(error.message);
    }
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <form className="form" onSubmit={onRegisterClickHandler}>
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
              name="address"
              type="text"
              value={user.address}
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
