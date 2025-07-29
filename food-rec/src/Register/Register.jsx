import React, { useState } from "react";
import "./Register.css";
import GoogleSignIn from "../GoogleSignIn";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await sendEmailVerification(userCredential.user);

      console.log("Registered user:", userCredential.user);
      console.log("First Name:", firstName);
      console.log("Last Name:", lastName);

      setSuccess("Registration successful! You can now log in.");
      setError(""); // Clear any previous errors
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      navigate("/dashboard");
    } catch (err) {
      console.error("Registration error:", err.message);
      setError(err.message);
      setSuccess(""); // Clear success message on error
    }
  };

  return (
    <div className="register">
      <form className="register-form" onSubmit={handleRegister}>
        <div className="register-title-section">
          <h1>Sign Up For Free!</h1>
        </div>
        <div className="google">
          <GoogleSignIn />
        </div>
        <div className="divider">
          <span>OR</span>
        </div>
        <div className="first-last-section">
          <label>First Name</label>
          <input
            type="text"
            className="first"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <label>Last Name</label>
          <input
            type="text"
            className="last"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <label>Email</label>
        <input
          type="email"
          placeholder="Email address"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label>Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm Password"
          className="input-field"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <div className="submit-button-section">
          <button className="submit-button">Register</button>
        </div>
        <p className="register-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
