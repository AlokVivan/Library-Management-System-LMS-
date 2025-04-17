import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminDashboard from './pages/AdminDashboard';
import Dashboard from "./pages/admin/Dashboard";
import StudentDashboard from './pages/StudentDashboard';
import ManageBooks from "./pages/admin/ManageBooks";
import ManageUsers from "./pages/admin/ManageUsers";
import AccountPage from "./pages/student/AccountPage"; // 🔹 Create this
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* ✅ Student Routes (Nested) */}
        <Route path="/student-dashboard" element={<StudentDashboard />}>
          <Route path="account" element={<AccountPage />} />
        </Route>

        {/* ✅ Admin Routes (Nested) */}
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="books" element={<ManageBooks />} />
          <Route path="users" element={<ManageUsers />} />
        </Route>
      </Routes>

      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default App;
