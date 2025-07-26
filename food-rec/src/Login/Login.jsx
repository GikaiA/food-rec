import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import GoogleSignIn from "../GoogleSignIn";

function Login() {
  return (
    <div className="login">
      <form className="login-form">
        <h1>Sign In</h1>
        <GoogleSignIn />
        <div className="divider">
          <span>OR</span>
        </div>
        <div className="input-field-section">
          <label>Email</label>
          <input
            type="text"
            className="input-field"
            placeholder="Enter your email"
          />
        </div>
        <div className="input-field-section">
          <label>Password</label>
          <input
            type="text"
            className="input-field"
            placeholder="Enter your pasword"
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
        <p className="signup-link">
          Don't have an account?{" "}
          <Link to="/register" className="link">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
