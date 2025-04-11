const jwt = require("jsonwebtoken");
const { pool } = require("../config/db");

// Middleware to protect routes
const protect = async (req, res, next) => {
  let token = req.headers.authorization;

  if (token && token.startsWith("Bearer ")) {
    try {
      token = token.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch user from DB
      const result = await pool.query("SELECT * FROM users WHERE id = $1", [
        decoded.id,
      ]);

      if (result.rows.length === 0) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = result.rows[0]; // Attach user to request
      next();
    } catch (err) {
      console.error("Auth Error:", err.message);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

// Middleware to check admin role
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
};

module.exports = { protect, isAdmin };
