import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/forms.css";  // Updated to reference the new CSS
import { loginUser } from "../services/AuthService";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();

  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const onRegisterClickHandler = () => {
    navigate("/register");
  };

  const onLoginClickHandler = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await loginUser(user);

      const token = response.data.accessToken;
      localStorage.setItem("token", token);
      localStorage.setItem("loggedRole", response.role);

      login(token);

      navigate("/createPost");
    } catch (error) {
      setError(error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <form className="form" onSubmit={onLoginClickHandler}>
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
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              name="password"
              type="password"
              value={user.password}
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="button-group">
            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
            <button type="button" onClick={onRegisterClickHandler}>
              Don't have an account?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
