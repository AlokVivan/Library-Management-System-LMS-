const db = require("../config/db");

const getRegisteredUsers = async () => {
  const result = await db.query("SELECT COUNT(*) FROM users");
  return result.rows[0].count;
};

module.exports = {
  getRegisteredUsers,
};
