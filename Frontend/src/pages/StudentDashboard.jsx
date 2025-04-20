import React, { useEffect, useState } from "react";
import { NavLink, useLocation, Outlet } from "react-router-dom";
import { LayoutDashboard, User, LogOut, Book } from "lucide-react";
import api from "../services/api"; // Axios instance
import profilePic from "../assets/alokpicture.jpg"; // ✅ Use import instead of public path
import "../styles/StudentDashboard.css";

const StudentDashboard = () => {
  const location = useLocation();
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [studentProfile, setStudentProfile] = useState({});
  const [limitReached, setLimitReached] = useState(false);
  const [bookLimit, setBookLimit] = useState(0);

  const handleReturnBook = async (bookId) => {
    const token = localStorage.getItem("token");
    if (!token || !bookId) {
      alert("Invalid book ID or missing token.");
      return;
    }

    if (!window.confirm("Are you sure you want to return this book?")) return;

    try {
      await api.put(`/books/return/${bookId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBorrowedBooks((prev) =>
        prev.filter((book) => book.id !== bookId)
      );
      alert("Book returned successfully!");
    } catch (err) {
      console.error("Error returning book:", err.response?.data || err.message);
      alert("Failed to return book.");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchData = async () => {
      try {
        const [borrowedRes, profileRes] = await Promise.all([
          api.get("/books/borrowed", { headers: { Authorization: `Bearer ${token}` } }),
          api.get("/users/me", { headers: { Authorization: `Bearer ${token}` } })
        ]);

        const { borrowedBooks = [] } = borrowedRes.data;
        const { borrow_limit = 3, borrowed_books_count, ...profile } = profileRes.data;

        setBorrowedBooks(borrowedBooks);
        setStudentProfile(profile);
        setBookLimit(borrow_limit);
        setLimitReached(borrowed_books_count >= borrow_limit);
      } catch (err) {
        console.error("Error fetching dashboard data", err.response?.data || err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="admin-dashboard ui-redesign">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <img src="/logo.png" alt="Logo" className="logo-img" />
        </div>
        <nav>
          <NavLink to="/student-dashboard" end className={({ isActive }) => (isActive ? "active" : "")}>
            <LayoutDashboard size={20} /> Dashboard
          </NavLink>
          <NavLink to="/student-dashboard/account" className={({ isActive }) => (isActive ? "active" : "")}>
            <User size={20} /> Account
          </NavLink>
          <NavLink to="/student-dashboard/library" className={({ isActive }) => (isActive ? "active" : "")}>
            <Book size={20} /> Library
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

      {/* Main Content */}
      <main className="main-content">
        <header className="dashboard-header">
          <h1>Student Dashboard</h1>
          <div className="admin-profile">
            <span>{studentProfile?.name || "Student"}</span>
            <img
              src={profilePic}
              alt="Student"
              className="profile-pic"
            />
          </div>
        </header>

        {/* Dashboard Home View */}
        {location.pathname === "/student-dashboard" && (
          <>
            <section className="summary-cards">
              <div className="card">
                <h3>Borrow Limit</h3>
                <p>{bookLimit}</p>
              </div>
              <div className="card">
                <h3>Books Borrowed</h3>
                <p>{borrowedBooks.length}</p>
              </div>
              <div className="card">
                <h3>Status</h3>
                <p className={limitReached ? "text-danger" : "text-success"}>
                  {limitReached ? "Limit Reached" : "Eligible to Borrow"}
                </p>
              </div>
            </section>

            <section>
              <h2>Borrowed Books</h2>
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Due Date</th>
                    <th>Return Book</th>
                  </tr>
                </thead>
                <tbody>
                  {borrowedBooks.length > 0 ? (
                    borrowedBooks.map((book, index) => (
                      <tr
                        key={index}
                        className={
                          book.due_date && new Date(book.due_date) < new Date()
                            ? "overdue"
                            : ""
                        }
                      >
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>
                          {book.due_date
                            ? new Date(book.due_date).toLocaleDateString()
                            : "N/A"}
                        </td>
                        <td>
                          <button
                            onClick={() => handleReturnBook(book.id)}
                            className="return-btn"
                          >
                            Return
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4">No books found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </section>
          </>
        )}

        {/* Nested Routes */}
        <Outlet />
      </main>
    </div>
  );
};

export default StudentDashboard;
