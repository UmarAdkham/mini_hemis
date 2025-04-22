const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: { rejectUnauthorized: false },
});

const getAllTeachers = async (req, res) => {
  try {
    const query = `
      SELECT id, firstname, lastname, username, role
      FROM users
      WHERE role = 'teacher';
    `;
    const result = await pool.query(query);

    res.status(200).json({
      message: 'Barcha o‘qituvchilar ro‘yxati',
      teachers: result.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server xatosi!' });
  }
};

module.exports = getAllTeachers;
