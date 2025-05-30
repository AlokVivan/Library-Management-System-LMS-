import React, { useEffect, useState } from "react";
import "./LibraryPage.css";
import api from "../../services/api"; // path adjust kar lena agar alag structure ho
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LibraryPage = () => {
  const [availableBooks, setAvailableBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmBorrow, setConfirmBorrow] = useState(null);

  useEffect(() => {
    fetchAvailableBooks();
  }, []);

  const fetchAvailableBooks = async () => {
    try {
      const res = await api.get("/books/available");
      setAvailableBooks(res.data.books);
    } catch (error) {
      console.error("Error fetching available books", error);
      toast.error("Failed to fetch available books.");
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

    try {
      const res = await api.post("/books/borrow", {
        book_id: confirmBorrow.id,
        return_by: "2025-04-30", // You can make this dynamic later
      });

      toast.success(`✅ Borrowed: ${confirmBorrow.title}`);
      setConfirmBorrow(null);
      fetchAvailableBooks();
    } catch (err) {
      console.error("Error borrowing book:", err);

      if (err.response && err.response.data && err.response.data.error) {
        toast.error(`❌ ${err.response.data.error}`);
      } else {
        toast.error("❌ Failed to borrow the book. Please login again if issue persists.");
      }
    }
  };

  return (
    <div className="library-wrapper">
      <h2 className="library-heading">📚 Library Catalog</h2>

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
