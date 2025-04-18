import React, { useEffect, useState } from "react";
import "./AccountPage.css";

const AccountPage = () => {
  const [user, setUser] = useState({ name: "", email: "" });
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (res.ok) setUser(data);
        else console.error("Failed to fetch user");
      } catch (err) {
        console.error("Error fetching user info:", err);
      }
    };

    fetchUser();
  }, []);

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/users/update-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();
      setMessage(res.ok ? "✅ Password updated successfully." : data.message || "❌ Failed to update password.");

      if (res.ok) {
        setCurrentPassword("");
        setNewPassword("");
      }
    } catch (err) {
      console.error("Error updating password:", err);
      setMessage("❌ Something went wrong.");
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
