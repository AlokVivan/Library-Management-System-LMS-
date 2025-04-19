const { Client } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  host: 'db.xiyhqylvtqbzgmspyjpy.supabase.co',
  port: 5432,
  ssl: { rejectUnauthorized: false },
  family: 4, // 🔥 Forces IPv4 (not IPv6)
});

const connectDB = async () => {
  try {
    await client.connect();
    console.log("✅ PostgreSQL Connected Successfully (IPv4)");
  } catch (err) {
    console.error("❌ Database Connection Error:", err);
    process.exit(1);
  }
};

module.exports = {
  client,
  connectDB,
  query: (text, params) => client.query(text, params),
};
