import { useState } from "react";
import { auth } from "../firebase"; // your firebase config
import { sendEmailVerification, reload } from "firebase/auth";
import { MdMarkEmailRead } from "react-icons/md";
import "./VerifyPage.css";

export default function VerifyPage() {
  const [message, setMessage] = useState("");

  const handleResend = async () => {
    if (auth.currentUser) {
      try {
        await sendEmailVerification(auth.currentUser);
        setMessage("Verification email re-sent! Please check your inbox.");
      } catch (err) {
        setMessage(err.message);
      }
    }
  };

  const handleCheckStatus = async () => {
    if (auth.currentUser) {
      await reload(auth.currentUser); // refresh user info from Firebase
      if (auth.currentUser.emailVerified) {
        setMessage(
          "✅ Your email is verified! You can now access your account."
        );
        // redirect to dashboard if you want
      } else {
        setMessage("❌ Still not verified. Please check your inbox.");
      }
    }
  };

  return (
    <div className="verify-email-page">
      <div className="verify-section">
        <div className="verify-icon-section">
          <MdMarkEmailRead className="verify-icon" />
        </div>
        <h2 className="verify-title">Verify Your Email</h2>
        <p>
          A verification email was sent to <b>{auth.currentUser?.email}</b>.
          Please click the link in that email before continuing.
        </p>

        <button onClick={handleResend}>Resend Verification Email</button>
        <button onClick={handleCheckStatus}>Check Verification Status</button>

        {message && <p>{message}</p>}
      </div>
    </div>
  );
}
