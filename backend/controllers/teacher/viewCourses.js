const pool = require('.../config/db')

exports.viewCourses = async (req, res) => {
  try {
    const teacherId = req.user.id; 
    const result = await pool.query(
        `SELECT * FROM  courses WHERE userId = $1`, [teacherId]
    )
    res.status(200).json(result.rows); // Kurslar ro'yxatini yuborish
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Serverda xatolik mavjud' });
  }
};
