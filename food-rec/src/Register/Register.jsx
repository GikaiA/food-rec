import React from "react";
import "./Register.css";

function Register() {
  return (
    <div className="register">
      <div className="register-title-section">
        <h1>Register</h1>
      </div>
      <form className="register-form">
        <input
          type="text"
          placeholder="Email address"
          className="input-field"
        ></input>
        <br />
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
