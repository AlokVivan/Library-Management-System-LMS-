import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import UserRequests from "./pages/admin/UserRequests";
import AdminDashboard from "./pages/AdminDashboard";
import AdminOverview from "./pages/admin/AdminOverview";
import StudentDashboard from "./pages/StudentDashboard";
import ManageBooks from "./pages/admin/ManageBooks";
import ManageUsers from "./pages/admin/ManageUsers";
import AccountPage from "./pages/student/AccountPage";
import LibraryPage from "./pages/student/LibraryPage"; // ✅ Imported here
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Routes>
        {/* ✅ Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* ✅ Student Routes */}
        <Route path="/student-dashboard" element={<StudentDashboard />}>
          <Route path="account" element={<AccountPage />} />
          <Route path="library" element={<LibraryPage />} /> {/* ✅ Added */}
        </Route>

        {/* ✅ Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<AdminOverview />} />
          <Route path="dashboard" element={<AdminOverview />} />
          <Route path="books" element={<ManageBooks />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="user-requests" element={<UserRequests />} />
          <Route path="account" element={<AccountPage />} />
        </Route>
      </Routes>

      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default App;
