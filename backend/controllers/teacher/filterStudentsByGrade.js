const pool = require('../../config/db');

exports.filterStudentsByGrade = async (req, res) => {
  try {
    const { grade } = req.query;
    const teacherId = req.user.id;

    let query = `
      SELECT s.id, s.firstname, s.lastname, s.grade 
      FROM students s
      INNER JOIN courses c ON s.course_id = c.id
      WHERE c.teacher_id = $1
    `;

    const queryParams = [teacherId];

    if (grade) {
      query += ` AND s.grade = $2 ORDER BY s.lastname ASC, s.firstname ASC`;
      queryParams.push(grade);
    } else {
      query += ` ORDER BY s.lastname ASC, s.firstname ASC`;
    }

    const result = await pool.query(query, queryParams);

    res.status(200).json({
      message: "Talabalar muvaffaqiyatli filtrlashdi",
      data: result.rows,
    });
  } catch (error) {
    console.error("Xatolik:", error);
    res.status(500).json({ message: "Server xatosi yuz berdi" });
  }
};