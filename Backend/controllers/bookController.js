const { pool } = require('../config/db');

// ===================== STUDENT =====================

// ✅ Return a borrowed book
const returnBook = async (req, res) => {
  const bookId = req.params.book_id;
  const userId = req.user.id;

  if (!bookId || isNaN(bookId)) {
    return res.status(400).json({ message: "Invalid or missing book ID." });
  }

  try {
    const result = await pool.query(
      `UPDATE borrowed_books 
       SET returned_at = NOW() 
       WHERE book_id = $1 AND student_id = $2 AND returned_at IS NULL
       RETURNING *`,
      [bookId, userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "No active borrowed book found to return." });
    }

    res.json({ message: "Book returned successfully." });
  } catch (error) {
    console.error("Error returning book:", error);
    res.status(500).json({ message: "Server error while returning book." });
  }
};

// ✅ View borrowed books by student
const getBorrowedBooksByStudent = async (req, res) => {
  try {
    const studentId = req.user.id;

    const result = await pool.query(`
      SELECT b.id, b.title, b.author, b.location, b.quantity,
             bb.borrowed_at, bb.return_by AS due_date, bb.returned_at
      FROM borrowed_books bb
      JOIN books b ON bb.book_id = b.id
      WHERE bb.student_id = $1 AND bb.returned_at IS NULL
    `, [studentId]);

    res.json({ borrowedBooks: result.rows });
  } catch (error) {
    console.error('Borrowed books error:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// ✅ Show all books with available quantity
const getAllBooksWithStock = async (req, res) => {
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

// ✅ Borrow a book with limit and availability check
const borrowBook = async (req, res) => {
  const studentId = req.user.id;
  const { book_id } = req.body;

  try {
    // 1. Check available quantity
    const result = await pool.query(
      `SELECT quantity - COUNT(bb.book_id) FILTER (WHERE bb.returned_at IS NULL) AS available_quantity
       FROM books b
       LEFT JOIN borrowed_books bb ON b.id = bb.book_id
       WHERE b.id = $1
       GROUP BY b.id`,
      [book_id]
    );

    if (!result.rows.length || result.rows[0].available_quantity <= 0) {
      return res.status(400).json({ error: "Book not available" });
    }

    // 2. Check student's current borrowed books
    const borrowCountResult = await pool.query(
      `SELECT COUNT(*) FROM borrowed_books WHERE student_id = $1 AND returned_at IS NULL`,
      [studentId]
    );

    const currentBorrowedCount = parseInt(borrowCountResult.rows[0].count, 10);

    // Get dynamic borrow limit
    const userResult = await pool.query(`SELECT book_limit FROM users WHERE id = $1`, [studentId]);
    const borrowLimit = userResult.rows[0]?.book_limit ?? 3;

    if (currentBorrowedCount >= borrowLimit) {
      return res.status(400).json({
        error: `Borrow limit reached. You can borrow up to ${borrowLimit} books.`,
      });
    }

    // 3. Set return_by to 7 days from now
    const return_by = new Date();
    return_by.setDate(return_by.getDate() + 7);

    // 4. Insert borrow record
    const borrowResult = await pool.query(
      `INSERT INTO borrowed_books (student_id, book_id, borrowed_at, return_by)
       VALUES ($1, $2, NOW(), $3) RETURNING *`,
      [studentId, book_id, return_by]
    );

    res.status(201).json({ message: "Book borrowed successfully", borrow: borrowResult.rows[0] });

  } catch (error) {
    console.error("Borrow book error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

// ===================== ADMIN =====================

// ✅ Add new book
const addBook = async (req, res) => {
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

// ✅ Update book
const updateBook = async (req, res) => {
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

// ✅ Delete book
const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query(`DELETE FROM books WHERE id = $1`, [id]);
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Delete book error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

// ===================== EXPORTS =====================

module.exports = {
  getBorrowedBooksByStudent,
  getAllBooksWithStock,
  borrowBook,
  returnBook,
  addBook,
  updateBook,
  deleteBook,
};
