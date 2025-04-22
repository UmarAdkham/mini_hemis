const pool = require('../models/db');

// Barcha studentlarni olish funksiyasi
const getAllStudents = async (req, res) => {
 try {
  const result = await pool.query("SELECT id, firstname, lastname, username FROM users WHERE role = 'student'");
  res.status(200).json(result.rows);
 } catch (err) {
  console.error(err);
  res.status(500).json({ error: "Server error" });
 }
};

module.exports = { getAllStudents };
