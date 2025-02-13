import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

const Login = () => {
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

  const onLoginClickHandler = async (event) => {
    event.preventDefault();
    setLoading(true); 
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.status === 400) {
        setError("Wrong username or password!");
      } else if (response.status === 401) {
        setError("Cannot login!");
      } else if (response.ok) {
        const data = await response.json();
        const token = `Bearer ${data.accessToken}`;
        localStorage.setItem("token", token);
        localStorage.setItem("loggedRole", data.role); 

      
        if (data.role === "ROLE_SYSTEM_ADMIN") {
          navigate("/complaintsToRespond");
        } else {
          navigate("/createPost");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong!");
    } finally {
      setLoading(false); // Re-enable button after the operation completes
    }
  };

  const onRegistrateClickHandler = () => {
    navigate("/register");
  };

  return (
    <div className="login-form-container">
      <div className="login-form-wrapper">
        <form className="login-form" onSubmit={onLoginClickHandler}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              onChange={handleChange}
              name="username"
              type="text"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password" className="item">Password</label>
            <input
              onChange={handleChange}
              name="password"
              type="password"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="button-group">
            <button className="item" type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
            <button type="button" onClick={onRegistrateClickHandler}>
              Don't have an account?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
