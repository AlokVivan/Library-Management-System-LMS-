const { pool } = require('../config/db');

// Student: View their borrowed books
exports.getBorrowedBooksByStudent = async (req, res) => {
  try {
    const studentId = req.user.id;

    const result = await pool.query(`
      SELECT b.id, b.title, b.author, b.location, b.quantity,
             bb.borrowed_at, bb.return_by, bb.returned_at
      FROM borrowed_books bb
      JOIN books b ON bb.book_id = b.id
      WHERE bb.student_id = $1
    `, [studentId]);

    res.json({ borrowedBooks: result.rows });

  } catch (error) {
    console.error('Borrowed books error:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Show all books with available quantity
exports.getAllBooksWithStock = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT b.*, 
        (b.quantity - COUNT(bb.book_id) FILTER (WHERE bb.returned_at IS NULL)) AS available_quantity
      FROM books b
      LEFT JOIN borrowed_books bb ON b.id = bb.book_id
      GROUP BY b.id
    `);

    res.json({ books: result.rows });
  } catch (error) {
    console.error('Books fetch error:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// ✅ Admin: Add new book
exports.addBook = async (req, res) => {
  const { title, author, upc, location, quantity } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO books (title, author, upc, location, quantity)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [title, author, upc, location, quantity]
    );
    res.status(201).json({ book: result.rows[0] });
  } catch (error) {
    console.error("Add book error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ Admin: Update book
exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, upc, location, quantity } = req.body;
  try {
    const result = await pool.query(
      `UPDATE books
       SET title = $1, author = $2, upc = $3, location = $4, quantity = $5
       WHERE id = $6 RETURNING *`,
      [title, author, upc, location, quantity, id]
    );
    res.json({ book: result.rows[0] });
  } catch (error) {
    console.error("Update book error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ Admin: Delete book
exports.deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query(`DELETE FROM books WHERE id = $1`, [id]);
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Delete book error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};
