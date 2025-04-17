import React, { useEffect, useState } from "react";
import { NavLink, useLocation, Outlet } from "react-router-dom";
import { LayoutDashboard, User, LogOut } from "lucide-react";
import axios from "axios";
import "../styles/StudentDashboard.css";

const StudentDashboard = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [availableBooks, setAvailableBooks] = useState([]);
  const [limitReached, setLimitReached] = useState(false);
  const [bookLimit, setBookLimit] = useState(0);
  const [studentProfile, setStudentProfile] = useState({});
  const [loadCount, setLoadCount] = useState(10);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchBorrowed = async () => {
      try {
        const res = await axios.get("/api/users/borrowed", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBorrowedBooks(Array.isArray(res.data) ? res.data : []);
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchAvailableBooks = async () => {
      try {
        const res = await axios.get("/api/books/available", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAvailableBooks(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching books:", err);
        setAvailableBooks([]);
      }
    };

    fetchAvailableBooks();
  }, [loadCount]);

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/books/search?query=${searchTerm}`
      );
      setAvailableBooks(res.data);
    } catch (err) {
      console.error("Error searching books", err);
    }
  };

  const handleBorrow = async (bookId) => {
    const token = localStorage.getItem("token");

    if (limitReached) {
      alert("You have reached your borrow limit.");
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/api/books/borrow/${bookId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Book borrowed successfully!");

      const [borrowedRes, profileRes] = await Promise.all([
        axios.get("http://localhost:5000/api/books/borrowed", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setBorrowedBooks(borrowedRes.data);
      const { borrow_limit = 3, borrowed_books_count } = profileRes.data;
      setBookLimit(borrow_limit);
      setLimitReached(borrowed_books_count >= borrow_limit);
    } catch (err) {
      alert(err.response?.data?.message || "Error borrowing book");
    }
  };

  const filteredBorrowed = borrowedBooks.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-dashboard ui-redesign">
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
            <span>{studentProfile.name || "Student"}</span>
            <img src="https://i.pravatar.cc/40" alt="Student" className="profile-pic" />
          </div>
        </header>

        {location.pathname === "/student-dashboard" && (
          <section>
            <h2>📘 Borrowed Books</h2>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search books by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Due Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredBorrowed.length > 0 ? (
                  filteredBorrowed.map((book, index) => (
                    <tr key={index}>
                      <td>{book.title}</td>
                      <td>{book.author}</td>
                      <td>
                        {book.due_date
                          ? new Date(book.due_date).toLocaleDateString()
                          : "N/A"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No books found.</td>
                  </tr>
                )}
              </tbody>
            </table>

            <h2>📚 Available Books</h2>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Search available books by title, id, or UPC..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button onClick={handleSearch} className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600">
                Search
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableBooks.map((book) => (
                <div key={book.id} className="border p-4 rounded shadow bg-white">
                  <h3 className="font-semibold text-lg">{book.title}</h3>
                  <p className="text-sm">Author: {book.author}</p>
                  <p className="text-sm">UPC: {book.upc}</p>
                  <button
                    className="mt-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    onClick={() => handleBorrow(book.id)}
                    disabled={limitReached}
                  >
                    Borrow Book
                  </button>
                </div>
              ))}
            </div>

            <div className="text-center mt-6">
              <button
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setLoadCount((prev) => prev + 10)}
              >
                Load More
              </button>
            </div>
          </section>
        )}

        <Outlet />
      </main>
    </div>
  );
};

export default StudentDashboard;
