const express = require('express');
const router = express.Router();

const { register, login } = require('../controllers/authController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

// Auth Routes
router.post('/register', register);
router.post('/login', login);

// 🧹 Removed routes related to deleted adminController.js

module.exports = router;
