import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, User, LogOut } from "lucide-react";
import "../styles/StudentDashboard.css";

const StudentDashboard = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    const fetchBorrowed = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/books/borrowed", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (Array.isArray(data)) {
          setBorrowedBooks(data);
        } else {
          console.error("Unexpected response:", data);
        }
      } catch (err) {
        console.error("Error fetching borrowed books", err);
      }
    };

    fetchBorrowed();
  }, []);

  const filteredBooks = borrowedBooks.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-dashboard ui-redesign">
      <aside className="sidebar">
        <div className="logo">
          <img src="src/assets/logo.png" alt="Logo" className="logo-img" />
        </div>
        <nav>
          <NavLink to="/student-dashboard" className={({ isActive }) => isActive ? "active" : ""}>
            <LayoutDashboard size={20} /> Dashboard
          </NavLink>

          <NavLink to="/student/account" className={({ isActive }) => isActive ? "active" : ""}>
            <User size={20} /> Account
          </NavLink>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            className="logout-button"
          >
            <LogOut size={20} /> Logout
          </button>
        </nav>
      </aside>

      <main className="main-content">
        <header className="dashboard-header">
          <h1>Student Dashboard</h1>
          <div className="admin-profile">
            <span>Student</span>
            <img src="https://i.pravatar.cc/40" alt="Student" className="profile-pic" />
          </div>
        </header>

        <section style={{ padding: "2rem" }}>
          <h2 className="text-2xl font-bold mb-4">📘 Borrowed Books</h2>
          <input
            type="text"
            placeholder="Search books by name..."
            className="border px-4 py-2 mb-4 rounded w-full max-w-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2">Title</th>
                <th className="py-2">Author</th>
                <th className="py-2">Due Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book, index) => (
                  <tr key={index}>
                    <td className="py-1">{book.title}</td>
                    <td className="py-1">{book.author}</td>
                    <td className="py-1">{book.due_date ? new Date(book.due_date).toLocaleDateString() : "N/A"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="py-4 text-center">No books found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default StudentDashboard;
