import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import './AdminAccount.css';

const AdminAccount = () => {
  const [adminData, setAdminData] = useState(null);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const fetchAdminProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAdminData(res.data);
    } catch (err) {
      toast.error("Failed to fetch admin details");
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:5000/api/users/update-password",
        passwordData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Password updated successfully");
      setPasswordData({ currentPassword: "", newPassword: "" });
    } catch (err) {
      toast.error("Failed to update password");
    }
  };

  useEffect(() => {
    fetchAdminProfile();
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow rounded-lg mt-8">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Admin Account</h2>

      {adminData ? (
        <div className="space-y-4 mb-6">
          <div><strong>Name:</strong> {adminData.name}</div>
          <div><strong>Email:</strong> {adminData.email}</div>
          <div><strong>Role:</strong> {adminData.role}</div>
        </div>
      ) : (
        <p>Loading admin data...</p>
      )}

      <form onSubmit={handlePasswordChange} className="space-y-4">
        <h3 className="font-semibold text-lg">Change Password</h3>
        <input
          type="password"
          name="currentPassword"
          placeholder="Current Password"
          className="w-full px-4 py-2 border rounded"
          value={passwordData.currentPassword}
          onChange={(e) =>
            setPasswordData({ ...passwordData, currentPassword: e.target.value })
          }
          required
        />
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          className="w-full px-4 py-2 border rounded"
          value={passwordData.newPassword}
          onChange={(e) =>
            setPasswordData({ ...passwordData, newPassword: e.target.value })
          }
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default AdminAccount;
