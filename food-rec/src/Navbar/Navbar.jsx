import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Listen for changes in the authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user); // Set to true if user exists, false otherwise
    });

    return () => unsubscribe(); // Clean up the listener when the component unmounts
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
      console.log("User logged out.");
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-title">
          <h1 className="navbar-title">FoodRec</h1>
        </Link>
        <div className="navbar-links">
          {isLoggedIn ? (
            <>
              <Link to="/questions" className="navbar-link">
               What You Craving
              </Link>
              <Link to="/search" className="navbar-link">
                Suprise Me
              </Link>
              <Link to="/profile" className="navbar-link">
                Profile
              </Link>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/register" className="navbar-link">
                Register
              </Link>
              <Link to="/login" className="navbar-link">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar
