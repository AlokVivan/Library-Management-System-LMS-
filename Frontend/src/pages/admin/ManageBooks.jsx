import React, { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../services/api"; // ✅ centralized API
import "../../styles/ManageBooks.css";

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    author: "",
    upc: "",
    location: "",
    quantity: "",
  });
  const [editId, setEditId] = useState(null);

  // ✅ Fetch books using centralized API
  const fetchBooks = async () => {
    try {
      const res = await api.get("/books/available");
      setBooks(res.data.books || []);
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to load books.");
      setBooks([]);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // ✅ Add / Update book
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      quantity: parseInt(form.quantity, 10),
    };

    try {
      if (editId) {
        await api.put(`/books/update/${editId}`, payload);
        toast.success("Book updated successfully!");
      } else {
        await api.post("/books/add", payload);
        toast.success("Book added successfully!");
      }

      setForm({
        title: "",
        author: "",
        upc: "",
        location: "",
        quantity: "",
      });
      setEditId(null);
      fetchBooks();
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Something went wrong while saving the book.");
    }
  };

  // ✅ Delete book
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/books/delete/${id}`);
      toast.success("Book deleted successfully!");
      fetchBooks();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete book.");
    }
  };

  const handleEdit = (book) => {
    setEditId(book.id);
    setForm({
      title: book.title,
      author: book.author,
      upc: book.upc,
      location: book.location,
      quantity: book.quantity.toString(),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="manage-books-container">
      <h2>📚 Manage Books</h2>

      <form onSubmit={handleSubmit} className="book-form">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="UPC"
          value={form.upc}
          onChange={(e) => setForm({ ...form, upc: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          required
        />

        <div className="form-actions">
          <button type="submit">{editId ? "Update Book" : "Add Book"}</button>
          {editId && (
            <button
              type="button"
              className="cancel-btn"
              onClick={() => {
                setEditId(null);
                setForm({
                  title: "",
                  author: "",
                  upc: "",
                  location: "",
                  quantity: "",
                });
              }}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <div className="book-table-container">
        <table className="book-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>UPC</th>
              <th>Location</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.upc}</td>
                <td>{book.location}</td>
                <td>{book.quantity}</td>
                <td>
                  <div className="actions">
                    <button onClick={() => handleEdit(book)} title="Edit">
                      <Pencil size={18} />
                    </button>
                    <button onClick={() => handleDelete(book.id)} title="Delete">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {books.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "1.5rem", color: "#6b7280" }}>
                  No books found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBooks;
