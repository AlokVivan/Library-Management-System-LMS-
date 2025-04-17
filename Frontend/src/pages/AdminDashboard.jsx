import React, { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  BarChart3,
  Users,
  Book,
  LogOut,
  UserCircle,
} from "lucide-react";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/dashboard");
        const data = await res.json();
        setDashboardData(data);
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="admin-dashboard ui-redesign">
      <aside className="sidebar">
        <div className="logo">
          <img src="src/assets/logo.png" alt="Logo" className="logo-img" />
        </div>
        <nav>
  <NavLink to="/admin" end className={({ isActive }) => (isActive ? "active" : "")}>
    <BarChart3 size={20} /> Dashboard
  </NavLink>
  <NavLink to="/admin/books" className={({ isActive }) => (isActive ? "active" : "")}>
    <Book size={20} /> Manage Books
  </NavLink>
  <NavLink to="/admin/users" className={({ isActive }) => (isActive ? "active" : "")}>
    <Users size={20} /> User Control
  </NavLink>
  <NavLink to="/admin/account" className={({ isActive }) => (isActive ? "active" : "")}>
    <UserCircle size={20} /> Account
  </NavLink>
  <NavLink to="/logout" className={({ isActive }) => (isActive ? "active" : "")}>
    <LogOut size={20} /> Logout
  </NavLink>
</nav>
      </aside>

      <main className="main-content">
        <header className="dashboard-header">
          <h1>Bookify LMS</h1>
          <div className="admin-profile">
            <span>Admin</span>
            <img
              src="https://i.pravatar.cc/40"
              alt="Admin"
              className="profile-pic"
            />
          </div>
        </header>

        {/* 🔄 Nested Route Rendering with context */}
        <Outlet context={{ dashboardData }} />
      </main>
    </div>
  );
};

export default AdminDashboard;
