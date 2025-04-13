import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminPanel from "./pages/AdminPanel";
import Dashboard from "./pages/admin/Dashboard";
import Books from "./pages/admin/Books";
import Users from "./pages/admin/Users";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Login" element={<Login />}></Route>

      <Route path="/admin" element={<AdminPanel />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="books" element={<Books />} />
        <Route path="users" element={<Users />} />
      </Route>
    </Routes>
  );
}

export default App;
