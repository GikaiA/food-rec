import React, { useState, useEffect } from 'react';
import './EmailVerification.css';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, sendEmailVerification } from 'firebase/auth';

const EmailVerification = () => {
  const [user, setUser] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setIsVerified(currentUser.emailVerified);
        
        if (currentUser.emailVerified) {
          navigate('/dashboard');
        }
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleResendEmail = async () => {
    if (user) {
      try {
        await sendEmailVerification(user);
        alert('Verification email sent!');
      } catch (error) {
        console.error('Error sending email:', error);
      }
    }
  };

  const handleRefresh = () => {
    if (user) {
      user.reload().then(() => {
        setIsVerified(user.emailVerified);
        if (user.emailVerified) {
          navigate('/dashboard');
        }
      });
    }
  };

  return (
    <div className="email-verification">
      <h2>Verify Your Email</h2>
      <p>We've sent a verification email to {user?.email}</p>
      <p>Please check your inbox and click the verification link.</p>
      
      <button onClick={handleRefresh}>
        I've verified my email
      </button>
      
      <button onClick={handleResendEmail}>
        Resend verification email
      </button>
    </div>
  );
};

export default EmailVerification;