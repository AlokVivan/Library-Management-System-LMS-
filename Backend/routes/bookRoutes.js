const express = require("express");
const router = express.Router();
const { protect, isAdmin } = require("../middleware/authMiddleware");
const bookController = require("../controllers/bookController");
const { authenticateUser } = require("../middleware/authMiddleware");

// ==================== Student Routes ====================

// Get all books with available stock
//router.get("/available", protect, bookController.getAllBooksWithStock); protected to use only but we have to use it for student so just remove protect
router.get("/available",  bookController.getAllBooksWithStock);

router.put("/return/:book_id", protect, bookController.returnBook);//student panel borrow book return karne ke liye


// Get books borrowed by a student
router.get("/borrowed", protect, bookController.getBorrowedBooksByStudent); // ✅ protected

// ==================== Admin Routes ====================

// Add new book
router.post("/add", protect, isAdmin, bookController.addBook); // ✅ protected + admin only

// Update book
router.put("/update/:id", protect, isAdmin, bookController.updateBook); // ✅ protected + admin only

// Delete book
router.delete("/delete/:id", protect, isAdmin, bookController.deleteBook); // ✅ protected + admin only

// Add this line in Student Routes
router.post("/borrow", protect, bookController.borrowBook); // ✅ protected


module.exports = router;
