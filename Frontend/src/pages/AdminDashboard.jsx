import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  BarChart3,
  Users,
  Book,
  LogOut,
  Settings,
  FileText,
} from "lucide-react";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const location = useLocation();

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
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <BarChart3 size={20} /> Dashboard
          </NavLink>
          <NavLink
            to="/admin/books"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <Book size={20} /> Manage Books
          </NavLink>
          <NavLink
            to="/admin/users"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <Users size={20} /> User Control
          </NavLink>
          <NavLink
            to="/admin/data"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <FileText size={20} /> Book Data
          </NavLink>
          <NavLink
            to="/admin/settings"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <Settings size={20} /> Settings
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

        {/* 🔁 This section shows only for /admin/dashboard route */}
        {location.pathname === "/admin" || location.pathname === "/admin/dashboard" ? (
          dashboardData ? (
            <section className="overview-grid">
              <div className="card">
                <div className="icon blue">
                  <Book size={24} />
                </div>
                <div>
                  <p>Total Books</p>
                  <h3>{dashboardData.totalBooks}</h3>
                </div>
              </div>
              <div className="card">
                <div className="icon teal">
                  <Book size={24} />
                </div>
                <div>
                  <p>Borrowed Books</p>
                  <h3>{dashboardData.borrowedBooks}</h3>
                </div>
              </div>
              <div className="card">
                <div className="icon purple">
                  <Users size={24} />
                </div>
                <div>
                  <p>Registered Users</p>
                  <h3>{dashboardData.registeredUsers}</h3>
                </div>
              </div>
            </section>
          ) : (
            <p style={{ padding: "2rem", fontSize: "1.2rem" }}>
              ⏳ Loading dashboard data...
            </p>
          )
        ) : (
          <Outlet /> // ✅ All nested pages like /admin/books will render here
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
