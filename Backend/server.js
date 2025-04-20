
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./config/db");

// Initialize environment variables
dotenv.config();
const app = express();

// ✅ Smart CORS setup for dev + prod
const allowedOrigins = [
  "http://localhost:5173",
  "https://bookifylms.xyz",
  "https://www.bookifylms.xyz",
  "https://bookify-topaz.vercel.app",
  "https://bookify-git-main-alok-vivans-projects.vercel.app",
  "https://bookify-alok-vivans-projects.vercel.app"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("❌ Not allowed by CORS: " + origin));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

// Middleware
app.use(express.json());

// ✅ Connect to the database
connectDB();

// ✅ Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/books", require("./routes/bookRoutes"));
app.use("/api/borrowed", require("./routes/borrowRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));

// ✅ Health check
app.get("/", (req, res) => {
  res.send("📚 Library Management System API is running...");
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
