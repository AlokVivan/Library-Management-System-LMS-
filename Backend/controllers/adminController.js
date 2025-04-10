// controllers/adminController.js

const pool = require('../config/db');

const getAllBorrowedBooks = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
         bb.id, 
         u.name AS student_name, 
         b.title AS book_title,
         b.location, 
         bb.borrowed_at, 
         bb.return_by, 
         bb.returned_at,
         b.quantity
       FROM borrowed_books bb
       JOIN users u ON bb.student_id = u.id
       JOIN books b ON bb.book_id = b.id
       ORDER BY bb.borrowed_at DESC`
    );

    res.status(200).json({
      success: true,
      borrowedBooks: result.rows
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const testAdmin = (req, res) => {
  res.send("Admin route is working ✅");
};

// 👇 Dono functions export karo
module.exports = {
  getAllBorrowedBooks,
  testAdmin
};
