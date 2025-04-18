import React, { useEffect, useState } from "react";
import { NavLink, useLocation, Outlet } from "react-router-dom";
import { LayoutDashboard, User, LogOut, Book } from "lucide-react";
import axios from "axios";
import "../styles/StudentDashboard.css";

const StudentDashboard = () => {
  const location = useLocation();
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [studentProfile, setStudentProfile] = useState({});
  const [limitReached, setLimitReached] = useState(false);
  const [bookLimit, setBookLimit] = useState(0);

  const handleReturnBook = async (bookId) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    if (!window.confirm("Are you sure you want to return this book?")) return;

    try {
      await axios.put(`/api/books/return/${bookId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBorrowedBooks((prev) => prev.filter((book) => book.book_id !== bookId));
      alert("Book returned successfully!");
    } catch (err) {
      console.error("Error returning book:", err.response?.data || err.message);
      alert("Failed to return book.");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchBorrowed = async () => {
      try {
        const res = await axios.get("/api/books/borrowed", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBorrowedBooks(res.data?.borrowedBooks || []);
      } catch (err) {
        console.error("Error fetching borrowed books", err.response?.data || err.message);
      }
    };

    const fetchStudentInfo = async () => {
      try {
        const res = await axios.get("/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { borrow_limit = 3, borrowed_books_count } = res.data;
        setStudentProfile(res.data);
        setBookLimit(borrow_limit);
        setLimitReached(borrowed_books_count >= borrow_limit);
      } catch (err) {
        console.error("Error fetching student info", err);
      }
    };

    fetchBorrowed();
    fetchStudentInfo();
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
              src="src/assets/alokpicture.jpg"
              alt="Student"
              className="profile-pic"
            />
          </div>
        </header>

        {/* Dashboard Home View */}
        {location.pathname === "/student-dashboard" && (
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
                    <tr key={index}>
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
        )}

        {/* Other Pages */}
        <Outlet />
      </main>
    </div>
  );
};

export default StudentDashboard;
