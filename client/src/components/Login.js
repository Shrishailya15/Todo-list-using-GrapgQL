import React, { useState } from "react";
import "./Auth.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signin } from "../services/user";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.warn("Email is required");
      return;
    }
    if (!password) {
      toast.warn("Password is required");
      return;
    }

    const response = await signin(email, password);
    if (!response) {
      toast.error("Error in signin");
    } else {
      sessionStorage.setItem("token", response.token);
      toast.success("Signin successful");
      navigate("/home");
    }
  };

  return (
    <div className="auth-container">
      <h2 className="title">Login</h2>
      <form className="form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter Email"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password" 
          placeholder="Enter Password"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="mb-3">
          Don't have an account? <Link to="/register">Register here</Link>
        </div>
        <button type="submit" className="btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
