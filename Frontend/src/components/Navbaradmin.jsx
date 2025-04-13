import React from "react";

export default function Navbar() {
  return (
    <nav className="admin-navbar">
      <div className="navbar-left">
        <h1>LMS</h1>
      </div>
      <div className="navbar-right">
        <div className="profile">
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="profile-img"
          />
          <span>Admin</span>
        </div>
      </div>
    </nav>
  );
}
