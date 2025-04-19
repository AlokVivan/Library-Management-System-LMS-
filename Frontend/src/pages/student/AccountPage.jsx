import React, { useEffect, useState } from "react";
import "./AccountPage.css";
import api from "../../services/api"; // adjust path if needed

const AccountPage = () => {
  const [user, setUser] = useState({ name: "", email: "" });
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/users/me");
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user info:", err);
      }
    };

    fetchUser();
  }, []);

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put("/users/update-password", {
        currentPassword,
        newPassword,
      });

      setMessage("✅ Password updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      console.error("Error updating password:", err);
      const errorMsg =
        err.response?.data?.message || "❌ Failed to update password.";
      setMessage(errorMsg);
    }
  };

  return (
    <div className="account-container">
      <div className="account-card">
        <h2 className="account-heading">👤 Account Info</h2>
        <div className="user-info">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>

        <hr />

        <h3 className="password-heading">🔒 Update Password</h3>
        <form onSubmit={handlePasswordUpdate} className="password-form">
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button type="submit">Update Password</button>
        </form>

        {message && <div className="feedback-msg">{message}</div>}
      </div>
    </div>
  );
};

export default AccountPage;
