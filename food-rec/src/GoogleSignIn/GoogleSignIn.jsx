import React from "react";
import "./GoogleSignIn.css";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../firebase";
import GoogleButton from "react-google-button";
import { FaGoogle } from "react-icons/fa";

const GoogleSignIn = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("User:", result.user);

      // Route to dashboard/home page after successful login
      navigate("/dashboard"); // or wherever you want to redirect
    } catch (error) {
      console.error("Error:", error);
      // Optional: show error message to user
    }
  };

  return (
    <div className="google-button-section">
      {/* <GoogleButton
        onClick={handleGoogleSignIn}
        style={{ textAlign: "center" }}
      >
        Sign in with Google
      </GoogleButton> */}
      <button className="google-button" onClick={handleGoogleSignIn}>
        <div className="google-logo">
          <FaGoogle />
        </div>
        <p className="google-sentence">Sign In With Google</p>
      </button>
    </div>
  );
};
export default GoogleSignIn;
