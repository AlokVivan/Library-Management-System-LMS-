import React, { useEffect, useState } from "react";
import axios from "axios";
import "./LibraryPage.css";

const LibraryPage = () => {
  const [availableBooks, setAvailableBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmBorrow, setConfirmBorrow] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAvailableBooks();
  }, []);

  const fetchAvailableBooks = async () => {
    try {
      const res = await axios.get("/api/books/available");
      setAvailableBooks(res.data.books);
    } catch (error) {
      console.error("Error fetching available books", error);
    }
  };

  const handleSearch = () => {
    if (!searchTerm) {
      fetchAvailableBooks();
      return;
    }

    const filtered = availableBooks.filter((book) =>
      [book.title, book.author, book.upc]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

    setAvailableBooks(filtered);
  };

  const handleBorrowConfirm = (book) => {
    setConfirmBorrow(book);
  };

  const handleBorrow = async () => {
    if (!confirmBorrow) return;

    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        "/api/books/borrow",
        {
          book_id: confirmBorrow.id,
          return_by: "2025-04-30", // You can make this dynamic later
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(`✅ Successfully borrowed: ${confirmBorrow.title}`);
      setConfirmBorrow(null);
      fetchAvailableBooks();
    } catch (err) {
      console.error("Error borrowing book:", err);

      // ✅ Show backend error message if available
      if (err.response && err.response.data && err.response.data.error) {
        setMessage(`❌ ${err.response.data.error}`);
      } else {
        setMessage("❌ Failed to borrow the book. Please login again if issue persists.");
      }
    }
  };

  return (
    <div className="library-wrapper">
      <h2 className="library-heading">📚 Library Catalog</h2>

      {/* Modernized Search Bar with Icon */}
      <div className="library-search-bar">
        <input
          type="text"
          placeholder="Search by title, author, or UPC..."
          className="library-search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <button onClick={handleSearch} className="library-search-button">
          🔍 Search
        </button>
      </div>

      {message && <div className="library-message">{message}</div>}

      <div className="library-catalog">
        {availableBooks.map((book) => (
          <div key={book.id} className="book-card">
            <div className="book-title">{book.title}</div>
            <div className="book-detail">Author: {book.author}</div>
            <div className="book-detail">UPC: {book.upc}</div>
            <div
              className={`book-detail ${
                book.available_quantity > 0
                  ? "book-available"
                  : "book-unavailable"
              }`}
            >
              Available: {book.available_quantity}
            </div>
            <button
              className="borrow-btn"
              onClick={() => handleBorrowConfirm(book)}
              disabled={book.available_quantity === 0}
            >
              Borrow
            </button>
          </div>
        ))}
      </div>

      {/* Borrow Confirmation Modal */}
      {confirmBorrow && (
        <div className="borrow-modal-overlay">
          <div className="borrow-modal">
            <h3>
              Are you sure you want to borrow <br />
              <span className="highlight">"{confirmBorrow.title}"</span>?
            </h3>
            <div className="modal-buttons">
              <button onClick={() => setConfirmBorrow(null)}>Cancel</button>
              <button className="confirm" onClick={handleBorrow}>
                Yes, Borrow
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LibraryPage;
