const pool = require("../../config/db");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.getAllSubmitWorks = async (req, res) => {
  try {
    // Tokenni olish
    const token = req.headers.authorization?.split(" ")[1];
    console.log("Token:", token ? token.substring(0, 10) + "..." : "No token");
    if (!token) {
      return res
        .status(401)
        .send({ message: "Tizimga kirish uchun token kerak" });
    }

    // JWT_SECRET ni tekshirish
    if (!process.env.SECRET_KEY) {
      console.error("JWT_SECRET is not defined in .env file");
      return res
        .status(500)
        .send({ message: "Server konfiguratsiyasida xatolik" });
    }

    // Tokenni tekshirish
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log("Decoded token:", decoded);
    const teacherId = decoded.id; // O‘qituvchi ID si

    // O‘qituvchi ekanligini tekshirish
    const teacherCheck = await pool.query(
      "SELECT * FROM users WHERE id = $1 AND role = $2",
      [teacherId, "teacher"]
    );
    console.log("Teacher check result:", teacherCheck.rows);

    if (teacherCheck.rows.length === 0) {
      return res
        .status(403)
        .send({ message: "Faqat o‘qituvchilar uchun ruxsat berilgan" });
    }

    // O‘qituvchining kurslariga tegishli topshirilgan ishlarni olish
    const result = await pool.query(
      `
      SELECT sw.id, sw.title, sw.filepath, sw.grade, sw.student_id, sw.task_id
      FROM studentwork sw
      JOIN tasks t ON sw.task_id = t.id
      JOIN courses c ON t.course_id = c.id
      WHERE c.teacher_id = $1
    `,
      [teacherId]
    );
    console.log("Submit works result:", result.rows);

    if (result.rows.length === 0) {
      return res
        .status(200)
        .send({ message: "Topshirilgan ismlar topilmadi", data: [] });
    }

    res.status(200).send(result.rows);
  } catch (error) {
    console.error("Xatolik:", error);

    if (error.name === "JsonWebTokenError") {
      return res
        .status(401)
        .send({ message: "Token noto‘g‘ri yoki muddati o‘tgan." });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).send({ message: "Token muddati o‘tgan." });
    }

    res.status(500).send({
      message: "Serverda xatolik yuz berdi.",
      error: error.message,
    });
  }
};
