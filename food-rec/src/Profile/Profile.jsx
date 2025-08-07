import React, { useEffect, useState } from "react";
import "./Profile.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

function Profile() {
  const [user, setUser] = useState(null);
  const [firstname, setFirstName] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Get first name from displayName
        setFirstName(currentUser.displayName || "User");
      }
    });

    return () => unsubscribe();
  });
  return (
    <div className="profile">
      <h1>Welcome, {firstname}!</h1>
      <div className="profile-section">
        <h1>My Information</h1>
        <div className="information-section">
          <p>Email: {user?.email}</p>
          <p>Password: placeholder</p>
          <div className="buttons">
            <button className="update-button">Update Profile</button>
            <button className="delete-button">Delete Account</button>
          </div>
        </div>
        <div className="saved-info-section">
          <div className="sub-info">
            <h2>Saved Recipes</h2>
            <p>Placeholder</p>
          </div>
          <div className="sub-info">
            <h2>Saved Restaurants</h2>
            <p>Placeholder</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
