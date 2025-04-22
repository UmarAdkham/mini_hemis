const { Pool } = require('pg');
require('dotenv').config();


const viewStudents = async (req, res) => {
  try {
    const query = `
      SELECT id, firstname, lastname, username, role
      FROM users
      WHERE role = 'student';
    `;
    const result = await pool.query(query);

    res.status(200).json({
      message: 'Barcha talabalar ro‘yxati',
      students: result.rows,
    });
  } catch (error) {
    console.error('Xatolik:', error);
    res.status(500).json({ error: 'Server xatosi!' });
  }
};

module.exports = viewStudents;
