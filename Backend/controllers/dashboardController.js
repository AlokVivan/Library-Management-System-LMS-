const { getTotalBooks, getBorrowedBooks } = require("../models/Book");
const { getRegisteredUsers } = require("../models/User");

const getDashboardStats = async (req, res) => {
  try {
    const [totalBooks, borrowedBooks, registeredUsers] = await Promise.all([
      getTotalBooks(),
      getBorrowedBooks(),
      getRegisteredUsers(),
    ]);

    // 🟡 Debug log for terminal
    //console.log("Books:", totalBooks, "Borrowed:", borrowedBooks, "Users:", registeredUsers);

    res.json({
      totalBooks: parseInt(totalBooks),
      borrowedBooks: parseInt(borrowedBooks),
      registeredUsers: parseInt(registeredUsers),
    });
  } catch (error) {
    console.error("Dashboard fetch error:", error);
    res.status(500).json({ message: "Error fetching dashboard data" });
  }
};

module.exports = { getDashboardStats };
