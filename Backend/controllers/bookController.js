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
