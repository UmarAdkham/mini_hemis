const pool = require('../../config/db');

const removeStudentFromCourse = async (req, res) => {
  const teacherId = req.user.id;
  const { studentId, courseId } = req.body;

  try {
    const result = await pool.query(
      `SELECT 1
      FROM courses
      WHERE id = $1 AND teacher_id = $2`
      ,
      [courseId, teacherId]
    );

    if (result.rowCount === 0) {
      return res.status(403).json({ message: 'Access denied or course not found' });
    }

    await pool.query(
      `DELETE FROM enrollment WHERE student_id = $1 AND course_id = $2`,
      [studentId, courseId]
    );

    res.status(200).json({ message: 'Student removed from course' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { removeStudentFromCourse };
