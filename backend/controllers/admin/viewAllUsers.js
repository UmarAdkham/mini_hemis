
const pool = require('../../config/db');

const viewAllUsers = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, firstname, lastname, username, role FROM users ORDER BY id'
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('viewAllUsers error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = viewAllUsers;
