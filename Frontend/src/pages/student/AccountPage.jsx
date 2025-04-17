import React, { useEffect, useState } from "react";

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
        setUser(data);
      } catch (err) {
        console.error("Error fetching user info:", err);
      }
    };
    console.log("Stored Token:", localStorage.getItem("token"));

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
      if (res.ok) {
        setMessage("Password updated successfully.");
        setCurrentPassword("");
        setNewPassword("");
      } else {
        setMessage(data.message || "Failed to update password.");
      }
    } catch (err) {
      console.error("Error updating password:", err);
      setMessage("Something went wrong.");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Account Info</h2>

      <div className="mb-6">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>

      <h3 className="text-xl font-semibold mb-2">Update Password</h3>
      <form onSubmit={handlePasswordUpdate} className="space-y-4">
        <input
          type="password"
          placeholder="Current Password"
          className="w-full px-4 py-2 border rounded"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="New Password"
          className="w-full px-4 py-2 border rounded"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Password
        </button>
      </form>

      {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
    </div>
  );
};

export default AccountPage;
