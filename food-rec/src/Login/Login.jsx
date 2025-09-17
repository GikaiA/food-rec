import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import GoogleSignIn from "../GoogleSignIn/GoogleSignIn";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import food from '../images/food.jpg'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Sign in user with email and password
      await signInWithEmailAndPassword(auth, email, password);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (!userCredential.user.emailVerified) {
        setError("Please verify your email before logging in.");
        return;
      }
      console.log("User logged in successfully");
      setError("");
      navigate("/dashboard"); // Redirect to a protected page
    } catch (err) {
      console.error("Error logging in:", err.message);
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="login">
      <div className="split left">
        <div className="bg"></div>
        <img src={food} className="bg-photo"></img>
      </div>
      < div className="split right">
      <div className="centered">
         <form className="login-form" onSubmit={handleLogin}>
        {error && <p className="error-message">{error}</p>}
        <h1>Sign In</h1>
        <GoogleSignIn />
        <div className="divider">
          <span>OR</span>
        </div>
        <div className="input-field-section">
          <label className="login-label">Email</label>
          <input
            type="text"
            className="input-field"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="login-label">Password</label>
          <input
            type="text"
            className="input-field"
            placeholder="Enter your pasword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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
      </div>
      {/* <form className="login-form" onSubmit={handleLogin}>
        {error && <p className="error-message">{error}</p>}
        <h1>Sign In</h1>
        <GoogleSignIn />
        <div className="divider">
          <span>OR</span>
        </div>
        <div className="input-field-section">
          <label className="login-label">Email</label>
          <input
            type="text"
            className="input-field"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="login-label">Password</label>
          <input
            type="text"
            className="input-field"
            placeholder="Enter your pasword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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
      </form> */}
    </div>
  );
};

export default Login;
