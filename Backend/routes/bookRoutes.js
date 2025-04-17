const express = require("express");
const router = express.Router();
const { protect, isAdmin } = require("../middleware/authMiddleware");
const bookController = require("../controllers/bookController");

// ==================== Student Routes ====================

// Get all books with available stock
router.get("/available", protect, bookController.getAllBooksWithStock);


// Get books borrowed by a student
router.get("/borrowed", protect, bookController.getBorrowedBooksByStudent); // ✅ protected

// ==================== Admin Routes ====================

// Add new book
router.post("/add", protect, isAdmin, bookController.addBook); // ✅ protected + admin only

// Update book
router.put("/update/:id", protect, isAdmin, bookController.updateBook); // ✅ protected + admin only

// Delete book
router.delete("/delete/:id", protect, isAdmin, bookController.deleteBook); // ✅ protected + admin only

module.exports = router;
