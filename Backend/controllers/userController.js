const { pool } = require("../config/db");

// Get profile of logged-in user
const getUserProfile = async (req, res) => {
  const userId = req.user.id;

  try {
    const userResult = await pool.query(
      "SELECT id, name, email, role, book_limit FROM users WHERE id = $1",
      [userId]
    );

    const user = userResult.rows[0];
    if (!user) return res.status(404).json({ error: "User not found" });

    let borrowedCount = 0;
    if (user.role === "student") {
      const borrowResult = await pool.query(
        "SELECT COUNT(*) FROM borrowed_books WHERE student_id = $1 AND returned_at IS NULL",
        [userId]
      );
      borrowedCount = parseInt(borrowResult.rows[0].count, 10);
    }

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      borrow_limit: user.book_limit, // 👈 Ye line important hai
      borrowed_books_count: borrowedCount,
    });
    
  } catch (err) {
    console.error("Error fetching user profile:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get users with status 'pending'
const getPendingUsers = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, email FROM users WHERE status = 'pending'"
    );
    res.json(result.rows); // frontend expects an array
  } catch (err) {
    console.error("Error fetching pending users:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Approve a pending user
const approveUser = async (req, res) => {
  const userId = req.params.id;

  try {
    await pool.query(
      "UPDATE users SET status = 'approved' WHERE id = $1",
      [userId]
    );
    res.json({ message: "User approved" });
  } catch (err) {
    console.error("Error approving user:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Deny (delete) a pending user
const denyUser = async (req, res) => {
  const userId = req.params.id;

  try {
    await pool.query("DELETE FROM users WHERE id = $1 AND status = 'pending'", [
      userId,
    ]);
    res.json({ message: "User denied and deleted" });
  } catch (err) {
    console.error("Error denying user:", err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getUserProfile,
  getPendingUsers,
  approveUser,
  denyUser,
};
