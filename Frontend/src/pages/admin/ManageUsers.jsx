import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../../styles/ManageUsers.css";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data;

      console.log("Users Response:", data); // Debug log

      // Normalize structure
      let normalizedUsers = [];
      if (Array.isArray(data)) {
        normalizedUsers = data;
      } else if (Array.isArray(data.users)) {
        normalizedUsers = data.users;
      } else if (Array.isArray(data.data)) {
        normalizedUsers = data.data;
      }

      setUsers(normalizedUsers);
    } catch (err) {
      toast.error("Failed to load users");
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (user) => {
    setEditMode(user.id);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
    });
  };

  const handleCancel = () => {
    setEditMode(null);
    setFormData({ name: "", email: "", role: "" });
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:5000/api/users/update/${editMode}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("User updated successfully");
      fetchUsers();
      setEditMode(null);
    } catch (err) {
      toast.error("Failed to update user");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:5000/api/users/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        toast.success("User deleted successfully");
        fetchUsers();
      } catch (err) {
        toast.error("Failed to delete user");
      }
    }
  };

  return (
    <div className="manage-users-container">
      <h2>Manage Users</h2>
      <div className="user-table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  {editMode === user.id ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td>
                  {editMode === user.id ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td>
                  {editMode === user.id ? (
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                    >
                      <option value="student">Student</option>
                      <option value="admin">Admin</option>
                    </select>
                  ) : (
                    user.role
                  )}
                </td>
                <td className="actions">
                  {editMode === user.id ? (
                    <>
                      <button onClick={handleUpdate}>Save</button>
                      <button className="cancel-btn" onClick={handleCancel}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(user)}>Edit</button>
                      <button onClick={() => handleDelete(user.id)}>
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
