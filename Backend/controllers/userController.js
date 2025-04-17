const { pool } = require("../config/db");

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
      ...user,
      borrowed_books_count: borrowedCount,
    });
  } catch (err) {
    console.error("Error fetching user profile:", err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getUserProfile,
};
