import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./UserRequests.css"; // ← Importing modern CSS

const UserRequests = () => {
  const [pendingUsers, setPendingUsers] = useState([]);

  const fetchPendingUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("/api/users/pending", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("🔍 res.data =", res.data);

      if (Array.isArray(res.data)) {
        setPendingUsers(res.data);
      } else {
        throw new Error("Invalid response format from server");
      }
    } catch (err) {
      console.error("Error fetching pending users", err);
      toast.error("Failed to fetch pending users");
    }
  };

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `/api/users/approve/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("User approved!");
      fetchPendingUsers();
    } catch (err) {
      console.error(err);
      toast.error("Failed to approve user");
    }
  };

  const handleDeny = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`/api/users/deny/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("User denied and removed.");
      fetchPendingUsers();
    } catch (err) {
      console.error(err);
      toast.error("Failed to deny user");
    }
  };

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  return (
    <div className="user-requests-container">
      <h2 className="user-requests-title">Pending User Requests</h2>

      {pendingUsers.length === 0 ? (
        <p className="text-gray-500 text-lg text-center">No pending requests.</p>
      ) : (
        <div className="user-card-grid">
          {pendingUsers.map((user) => (
            <div key={user.id} className="user-card">
              <div>
                <h3>{user.name || "Unnamed User"}</h3>
                <p>{user.email}</p>
              </div>
              <div className="actions">
                <button className="approve-btn" onClick={() => handleApprove(user.id)}>
                  Approve
                </button>
                <button className="deny-btn" onClick={() => handleDeny(user.id)}>
                   Deny
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserRequests;
