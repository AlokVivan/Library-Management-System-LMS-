const express = require('express');
const router = express.Router();

const { getStudentBorrowedBooks, getAllBorrowedBooks } = require('../controllers/borrowController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

router.get('/student', protect, getStudentBorrowedBooks);
router.get('/admin', protect, isAdmin, getAllBorrowedBooks);

module.exports = router;
