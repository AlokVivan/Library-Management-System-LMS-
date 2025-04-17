const express = require("express");
const router = express.Router();
const { pool } = require("../config/db");
const bcrypt = require("bcryptjs");
const { protect, isAdmin } = require("../middleware/authMiddleware");
const { getUserProfile } = require("../controllers/userController");

// ✅ GET all users (Admin only)
router.get("/", protect, isAdmin, async (req, res) => {
  try {
    const result = await pool.query("SELECT id, name, email, role FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ GET current user profile (Student/Admin)
router.get("/me", protect, getUserProfile);

// ✅ PUT - update user profile (name/email)
router.put("/update-profile", protect, async (req, res) => {
  const userId = req.user.id;
  const { name, email } = req.body;

  try {
    await pool.query(
      "UPDATE users SET name = $1, email = $2 WHERE id = $3",
      [name, email, userId]
    );
    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ error: "Failed to update profile" });
  }
});

// ✅ PUT - update password
router.put("/update-password", protect, async (req, res) => {
  const userId = req.user.id;
  const { currentPassword, newPassword } = req.body;

  try {
    const result = await pool.query("SELECT password FROM users WHERE id = $1", [userId]);
    const user = result.rows[0];

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Current password is incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await pool.query("UPDATE users SET password = $1 WHERE id = $2", [hashedPassword, userId]);

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Password update error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ PUT - update any user (Admin)
router.put("/update/:id", protect, isAdmin, async (req, res) => {
  const { name, email, role } = req.body;
  const { id } = req.params;

  try {
    await pool.query(
      "UPDATE users SET name = $1, email = $2, role = $3 WHERE id = $4",
      [name, email, role, id]
    );
    res.json({ message: "User updated" });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Failed to update user" });
  }
});

// ✅ DELETE - delete user (Admin)
router.delete("/delete/:id", protect, isAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM users WHERE id = $1", [id]);
    res.json({ message: "User deleted" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

module.exports = router;
