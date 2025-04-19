
const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();


const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});


const connectDB = async () => {
  try {
    await pool.connect();
    console.log("✅ PostgreSQL Connected Successfully");
  } catch (err) {
    console.error("❌ Database Connection Error:", err);
    process.exit(1);
  }
};

// ✅ This is the important part
module.exports = {
  pool,
  connectDB,
  query: (text, params) => pool.query(text, params), // 👈 this makes db.query() work
};
