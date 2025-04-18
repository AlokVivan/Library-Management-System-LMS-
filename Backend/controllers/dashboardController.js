const pool = require("../config/db");
const { getTotalBooks, getBorrowedBooks } = require("../models/Book");
const { getRegisteredUsers } = require("../models/User");

// 📊 Dashboard Summary Stats
const getDashboardStats = async (req, res) => {
  try {
    const [totalBooks, borrowedBooks, registeredUsers] = await Promise.all([
      getTotalBooks(),
      getBorrowedBooks(),
      getRegisteredUsers(),
    ]);

    res.json({
      totalBooks: parseInt(totalBooks),
      borrowedBooks: parseInt(borrowedBooks),
      registeredUsers: parseInt(registeredUsers),
    });
  } catch (error) {
    console.error("Dashboard fetch error:", error);
    res.status(500).json({ message: "Error fetching dashboard data" });
  }
};

// 🕵️‍♂️ Recent 5 Borrow Activities
const getRecentActivity = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        u.name AS student_name,
        b.title AS book_title,
        br.borrowed_at,
        br.returned_at
      FROM borrowed_books br
      JOIN users u ON br.student_id = u.id
      JOIN books b ON br.book_id = b.id
      ORDER BY br.borrowed_at DESC
      LIMIT 5
    `);

    res.json(result.rows);
  } catch (err) {
    console.error("❌ Recent activity error:", err);
    res.status(500).json({ error: "Failed to fetch recent activity" });
  }
};

// ⌛ Overdue Returns
const getOverdueReturns = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT DISTINCT ON (u.id, b.id)
        u.name AS student_name,
        b.title AS book_title,
        br.due_date
      FROM borrowed_books br
      JOIN users u ON br.student_id = u.id
      JOIN books b ON br.book_id = b.id
      WHERE br.returned_at IS NULL AND br.due_date < CURRENT_DATE
      ORDER BY u.id, b.id, br.due_date DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Overdue fetch error:", err);
    res.status(500).json({ error: "Failed to fetch overdue returns" });
  }
};

// 📆 Books Due Within 7 Days
const getDueThisWeek = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT DISTINCT ON (u.id, b.id)
        u.name AS student_name,
        b.title AS book_title,
        br.due_date
      FROM borrowed_books br
      JOIN users u ON br.student_id = u.id
      JOIN books b ON br.book_id = b.id
      WHERE br.returned_at IS NULL 
        AND br.due_date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '7 days'
      ORDER BY u.id, b.id, br.due_date DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Due this week error:", err);
    res.status(500).json({ error: "Failed to fetch due this week" });
  }
};

// 📈 Monthly Borrowed Books Graph
const getBorrowedGraph = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        TO_CHAR(DATE_TRUNC('month', borrowed_at), 'YYYY-MM') AS month, 
        COUNT(*) AS total
      FROM borrowed_books
      GROUP BY month
      ORDER BY month ASC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Graph fetch error:", err);
    res.status(500).json({ error: "Failed to fetch borrowed graph" });
  }
};

module.exports = {
  getDashboardStats,
  getRecentActivity,
  getOverdueReturns,
  getDueThisWeek,
  getBorrowedGraph,
};
