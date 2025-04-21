import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import "../styles/Login.css"; // 🔥 Reusing same style

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      // ✅ Replace with your API call
      console.log("Reset request sent to:", email);
      setSubmitted(true);
    } catch (error) {
      alert("Failed to send reset email.");
    }
  };

  return (
    <section className="login-section">
      <div className="form-box">
        <div className="form-value">
          <form onSubmit={handleReset}>
            <h2 className="loginh2">Reset Password</h2>

            {!submitted ? (
              <>
                <div className="inputbox">
                  <FaEnvelope className="react-icon" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label>Email</label>
                </div>

                <button type="submit" className="auth-button">
                  Send Reset Link
                </button>
              </>
            ) : (
              <p style={{ color: "white", textAlign: "center" }}>
                Reset link sent to <strong>{email}</strong>. Check your inbox!
              </p>
            )}

            <div className="register">
              <p>
                Go back to{" "}
                <a href="#" onClick={() => navigate("/login")}>
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
