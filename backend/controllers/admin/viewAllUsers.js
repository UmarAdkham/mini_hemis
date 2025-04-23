const pool = require("../../config/db");

exports.viewAllUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    const users = result.rows;

    if (users.length === 0) {
      return res.status(404).json({ message: 'User topilmadi' });
    }

    res.status(200).json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}