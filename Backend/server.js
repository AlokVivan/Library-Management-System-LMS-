const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./config/db");

// Initialize
dotenv.config();
const app = express();

// Route Imports
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const borrowRoutes = require("./routes/borrowRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

// Middlewares
app.use(cors());
app.use(express.json());

// DB Connect
connectDB();

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes); // ✅ sirf ek hi baar
app.use("/api/borrowed", borrowRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Basic Test Route
app.get('/', (req, res) => {
  res.send('📚 Library Management System API is running...');
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
