<<<<<<< HEAD
const pool = require(".../config/db");

exports.getAllCourses = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM courses");

    if (result.rows.length === 0) {
      return res.status(404).send({ message: "Kurslar topilmadi" });
    }

    res.status(200).json({
      message: "Kurslar muvaffaqiyatli olindi",
      data: result.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Kurslarni olishda xatolik yuz berdi" });
=======
const pool = require("../../config/db");
exports.viewCourseStudents = async (req, res) => {
  try {
    const query = `
      SELECT 
        c.id AS course_id,
        c.name AS course_name,
        u.id AS student_id,
        u.firstname,
        u.lastname,
        u.username
      FROM courses c
      INNER JOIN enrollment e ON c.id = e.course_id
      INNER JOIN users u ON e.student_id = u.id
      WHERE u.role = 'student'
      ORDER BY c.id, u.firstname
    `;

    const result = await pool.query(query);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Hech qanday talaba topilmadi" });
    }

    res.status(200).json({
      message: "Talabalar ro'yxati muvaffaqiyatli olindi",
      data: result.rows,
    });

  } catch (error) {
    console.error("Xatolik:", error);
    res.status(500).json({ message: "Talabalarni olishda xatolik yuz berdi" });
>>>>>>> 564b437d82f72cd4731362773fbfe42ff4008aa3
  }
};
