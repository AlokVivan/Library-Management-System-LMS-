import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded hover:bg-gray-200 ${
      isActive ? "bg-gray-300 font-semibold" : ""
    }`;

  return (
    <div className="sidebar p-4 bg-white shadow h-full">
      <ul className="space-y-2">
        <li>
          <NavLink to="/admin/dashboard" className={linkClass}>
            📊 Dashboard
          </NavLink>
        </li>
        
        <li>
          <NavLink to="/admin/books" className={linkClass}>
            📚 Manage Books
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/users" className={linkClass}>
            👥 Manage Users
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/settings" className={linkClass}>
            ⚙️ Settings
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
