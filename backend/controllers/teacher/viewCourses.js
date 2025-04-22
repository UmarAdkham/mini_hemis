const pool = require("../../config/db");

exports.getAllCourses = async (req, res) => {
  try {
    const teacherId = parseInt(req.params.teacherId)
    const result = await pool.query("SELECT * FROM courses where teacher_id = $1", [teacherId]);

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
  }
};
