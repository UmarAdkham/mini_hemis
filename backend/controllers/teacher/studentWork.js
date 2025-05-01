const pool = require("../../config/db");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.getAllSubmitWorks = async (req, res) => {
  try {
    // Tokenni olish
    const token = req.headers.authorization?.split(" ")[1];
    console.log("Token:", token ? token.substring(0, 10) + "..." : "No token");
    if (!token) {
      return res.status(401).send({ message: "Tizimga kirish uchun token kerak" });
    }

    // JWT_SECRET ni tekshirish
    if (!process.env.SECRET_KEY) {
      console.error("JWT_SECRET is not defined in .env file");
      return res.status(500).send({ message: "Server konfiguratsiyasida xatolik" });
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
      return res.status(403).send({ message: "Faqat o‘qituvchilar uchun ruxsat berilgan" });
    }

    // Query parametridan course_id ni olish
    const { course_id } = req.query;
    let queryText = `
      SELECT sw.id, sw.title, sw.filepath, sw.grade, sw.student_id, sw.task_id, 
             u.firstname AS student_name, t.title AS task_title, c.name AS course_title
      FROM studentwork sw
      JOIN tasks t ON sw.task_id = t.id
      JOIN courses c ON t.course_id = c.id
      JOIN users u ON sw.student_id = u.id
      WHERE c.teacher_id = $1
    `;
    const queryParams = [teacherId];

    // Agar course_id berilgan bo‘lsa, filtr qo‘shish
    if (course_id) {
      if (isNaN(course_id)) {
        return res.status(400).send({ message: "Noto‘g‘ri kurs ID’si." });
      }
      queryText += ` AND c.id = $2`;
      queryParams.push(course_id);
    }

    // Topshirilgan ishlarni olish
    const result = await pool.query(queryText, queryParams);
    console.log("Submit works result:", result.rows);

    if (result.rows.length === 0) {
      return res.status(200).send({ message: "Topshirilgan ismlar topilmadi", data: [] });
    }

    res.status(200).send(result.rows);
  } catch (error) {
    console.error("Xatolik:", error);
    if (error.name === "JsonWebTokenError") {
      return res.status(401).send({ message: "Token noto‘g‘ri yoki muddati o‘tgan." });
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