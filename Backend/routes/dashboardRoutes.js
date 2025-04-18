const express = require("express");
const router = express.Router();

const {
  getDashboardStats,
  getRecentActivity,
  getOverdueReturns,
  getDueThisWeek,
  getBorrowedGraph,
} = require("../controllers/dashboardController");

// Dashboard Summary Stats (totalBooks, borrowedBooks, registeredUsers)
router.get("/stats", getDashboardStats);

// Recent 5 Borrow Activities
router.get("/recent-activity", getRecentActivity);

// Overdue Returns (not returned & past due date)
router.get("/overdue", getOverdueReturns);

// Books Due Within 7 Days
router.get("/due-this-week", getDueThisWeek);

// Monthly Borrowed Books Chart Data
router.get("/borrowed-graph", getBorrowedGraph);

module.exports = router;
