const express = require("express");
const router = express.Router();
const { protect, isAdmin } = require("../middleware/authMiddleware");
const bookController = require("../controllers/bookController");

// ==================== Student Routes ====================

// Get all books with available stock
router.get("/available", bookController.getAllBooksWithStock);

// Get books borrowed by the logged-in student
router.get("/borrowed", protect, bookController.getBorrowedBooksByStudent);

// Return a borrowed book
router.put("/return/:book_id", protect, bookController.returnBook);

// Borrow a book
router.post("/borrow", protect, bookController.borrowBook);

// ==================== Admin Routes ====================

// Add new book
router.post("/add", protect, isAdmin, bookController.addBook);

// Update book
router.put("/update/:id", protect, isAdmin, bookController.updateBook);

// Delete book
router.delete("/delete/:id", protect, isAdmin, bookController.deleteBook);

// NEW: Get overdue returns (for admin dashboard)
router.get("/overdue", protect, isAdmin, bookController.getOverdueReturns);

// NEW: Get books due this week (for admin dashboard)
router.get("/due-this-week", protect, isAdmin, bookController.getBooksDueThisWeek);

module.exports = router;
