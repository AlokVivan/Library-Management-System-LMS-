const express = require('express');
const router = express.Router();

const { register, login } = require('../controllers/authController');
const { getAllBorrowedBooks, testAdmin } = require('../controllers/adminController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

// Auth Routes
router.post('/register', register);
router.post('/login', login);

// Admin Route 🛡️
router.get('/borrowed-books', verifyToken, isAdmin, getAllBorrowedBooks);
router.get('/admin-test', testAdmin);

module.exports = router;
