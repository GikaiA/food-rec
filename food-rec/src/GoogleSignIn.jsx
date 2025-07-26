import React from 'react'
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from './firebase';
import GoogleButton from 'react-google-button';

const GoogleSignIn = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log('User:', result.user);
      
      // Route to dashboard/home page after successful login
      navigate('/dashboard'); // or wherever you want to redirect
      
    } catch (error) {
      console.error('Error:', error);
      // Optional: show error message to user
    }
  };

  return (
    <GoogleButton onClick={handleGoogleSignIn} style={{textAlign:'center'}} >
      Sign in with Google
    </GoogleButton>
  );
};
export default GoogleSignIn
