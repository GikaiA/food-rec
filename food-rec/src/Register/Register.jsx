import React from "react";
import "./Register.css";

function Register() {
  return (
    <div className="register">
      <form className="register-form">
        <div className="register-title-section">
          <h1>Register</h1>
        </div>
        <div className="google">
          <p>SIGN IN WITH GOOGLE PLACEHOLDER</p>
        </div>
        
        <div className="first-last-section">
          <label>First Name</label>
          <input type="text" className="first" placeholder="First Name"></input>
          <label>Last Name</label>
          <input type="text" className="last" placeholder="Last Name"></input>
        </div>
        <label>Email</label>
        <input
          type="text"
          placeholder="Email address"
          className="input-field"
        ></input>
        <br />
        <label>Password</label>
        <input
          type="text"
          placeholder="Password"
          className="input-field"
        ></input>
        <div className="submit-button-section">
          <button className="submit-button">Register</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
