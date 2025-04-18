const express = require("express");
const router = express.Router();
const { pool } = require("../config/db");

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await pool.query(
      "INSERT INTO contact_messages (name, email, message) VALUES ($1, $2, $3)",
      [name, email, message]
    );
    res.json({ success: true, message: "Message saved successfully" });
  } catch (err) {
    console.error("❌ Error saving contact message:", err.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

module.exports = router;
