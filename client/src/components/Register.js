import React, { useState } from "react";
import "./Auth.css";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../services/user";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => { 
    e.preventDefault();

    if (!name) {
      toast.warn("Name is required");
      return;
    }
    if (!email) {
      toast.warn("Email is required");
      return;
    }
    if (!password) {
      toast.warn("Password is required");
      return;
    }

    const response = await signup(name, email, password);
    if (response) {
      toast.success("Signup successful");
      navigate("/");
    } else {
      toast.error("Error in signup");
    }
  };

  return (
    <div className="auth-container">
      <h2 className="title">Register</h2>
      <form className="form" onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Enter Name"
          className="input-field"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
          Already have an account? <Link to="/">Login here</Link>
        </div>
        <button type="submit" className="btn">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
