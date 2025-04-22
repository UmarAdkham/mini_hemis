const bcrypt = require('bcrypt');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const createTeacher = async (req, res) => {
  const { firstname, lastname, username, password } = req.body;

  if (!firstname || !lastname || !username || !password) {
    return res.status(400).json({ error: "Barcha maydonlar to'ldirilishi kerak!" });
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const query = `
      INSERT INTO users (firstname, lastname, username, password, role)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, firstname, lastname, username, role;
    `;
    const values = [firstname, lastname, username, hashedPassword, 'teacher'];

    const result = await pool.query(query, values);

    res.status(201).json({
      message: 'O\'qituvchi muvaffaqiyatli yaratildi!',
      teacher: result.rows[0],
    });
  } catch (error) {
    if (error.code === '23505') {
      return res.status(400).json({ error: 'Bu username allaqachon mavjud!' });
    }
    console.error(error);
    res.status(500).json({ error: 'Server xatosi!' });
  }
};

module.exports = createTeacher;