import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/Login.css"; // Reusing your existing style

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Password reset successful. Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage(data.error || "Something went wrong.");
      }
    } catch (error) {
      setMessage("Server error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-section">
      <div className="form-box">
        <div className="form-value">
          <form onSubmit={handleReset}>
            <h2 className="loginh2">Set New Password</h2>

            <div className="inputbox">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>New Password</label>
            </div>

            <div className="inputbox">
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <label>Confirm Password</label>
            </div>

            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? "Updating..." : "Set Password"}
            </button>

            {message && <p style={{ marginTop: "1rem", color: "white" }}>{message}</p>}

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
