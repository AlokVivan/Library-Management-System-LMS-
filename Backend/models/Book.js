const db = require("../config/db");

const getTotalBooks = async () => {
  const result = await db.query("SELECT COUNT(*) FROM books");
  return result.rows[0].count;
};

const getBorrowedBooks = async () => {
  const result = await db.query("SELECT COUNT(*) FROM issued_books");
  return result.rows[0].count;
};

module.exports = {
  getTotalBooks,
  getBorrowedBooks,
};
