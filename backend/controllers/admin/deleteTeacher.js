const pool = require('../db');

const deleteStudent = async (req, res) => {
  const teacherId = req.user.id;
  const studentId = parseInt(req.params.id);

  try {
    const result = await pool.query(
      `
      SELECT 1
      FROM users u
      JOIN enrollment e ON u.id = e.student_id
      JOIN courses c ON c.id = e.course_id
      WHERE u.id = $1 AND u.role = 'student' AND c.teacher_id = $2
      LIMIT 1
      `,
      [studentId, teacherId]
    );

    if (result.rowCount === 0) {
      return res.status(403).json({ message: 'Access denied or student not found' });
    }

    await pool.query(`DELETE FROM users WHERE id = $1`, [studentId]);

    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { deleteStudent };
