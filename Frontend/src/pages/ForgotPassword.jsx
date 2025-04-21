import React, { useState } from "react";
import api from "../services/api";
import "../styles/Login.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/forgot-password", { email });
      setMessage(res.data.message || "Reset link sent to your email.");
    } catch (error) {
      setMessage(error.response?.data?.error || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-section">
      <div className="form-box">
        <div className="form-value">
          <form onSubmit={handleSubmit}>
            <h2 className="loginh2">Forgot Password</h2>

            <div className="inputbox">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Enter your email</label>
            </div>

            <button type="submit" className="auth-button">
              {loading ? "Sending..." : "Send Reset Link"}
            </button>

            {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
