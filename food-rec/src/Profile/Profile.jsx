import React from 'react';
import './Profile.css';

function Profile() {
  return (
    <div className='profile'>
      <h1>Welcome User!</h1>
      <div className='profile-section'>
        <h1>My Information</h1>
        <div className='information-section'>
          <p>Email: placeholder</p>
          <p>Password: placeholder</p>
          <div className='saved-info-section'>
            <div className='sub-info'>
              <h2>Saved Recipes</h2>
              <p>Placeholder</p>
            </div>
            <div className='sub-info'>
              <h2>Saved Recipes</h2>
              <p>Placeholder</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
