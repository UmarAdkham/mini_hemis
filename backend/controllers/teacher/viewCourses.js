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

const pool = require("../../config/db");

exports.addTask = async (req, res) => {
  try {
    const { title, description, course_id } = req.body;

    // Majburiy maydonlarni tekshiramiz
    if (!title || !description || !course_id) {
      return res.status(400).send({ message: "Barcha maydonlar to'ldirilishi shart" });
    }

    // Berilgan course_id bo'yicha kurs mavjudligini tekshiramiz
    const courseCheck = await pool.query("SELECT * FROM course WHERE id = $1", [course_id]);
    if (courseCheck.rows.length === 0) {
      return res.status(404).send({ message: "Bunday kurs mavjud emas" });
    }

    // Task qo'shamiz
    const result = await pool.query(
      "INSERT INTO task (title, description, course_id) VALUES ($1, $2, $3) RETURNING *",
      [title, description, course_id]
    );

    res.status(201).send({
      message: "Topshiriq muvaffaqiyatli qo'shildi",
      data: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Topshiriq qo'shishda xatolik yuz berdi" });
  }
};



exports.allCourse = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT * FROM courses`)
    res.status(200).json(result.rows)
  } catch (error) {
    res.json(error)
  }

}