const { pool } = require('../config/db');

// Student: View borrowed books
exports.getStudentBorrowedBooks = async (req, res) => {
  try {
    const studentId = req.user.id;

    const result = await pool.query(`
      SELECT bb.id, b.title, b.author, b.location, b.quantity,
             bb.borrowed_at, bb.return_by
      FROM borrowed_books bb
      JOIN books b ON bb.book_id = b.id
      WHERE bb.student_id = $1
    `, [studentId]);

    res.json({ borrowed: result.rows });
  } catch (err) {
    console.error('Error fetching student borrowed books:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

// Admin: View all borrowed books
exports.getAllBorrowedBooks = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT bb.id, u.name AS student_name, u.email,
             b.title, b.author, b.location, b.quantity,
             bb.borrowed_at, bb.return_by
      FROM borrowed_books bb
      JOIN books b ON bb.book_id = b.id
      JOIN users u ON bb.student_id = u.id
    `);

    res.json({ borrowed: result.rows });
  } catch (err) {
    console.error('Error fetching all borrowed books:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};
