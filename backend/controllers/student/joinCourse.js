const pool = require("../../config/db");

exports.joinCourse = async (req, res) => {
    try {
        const { student_id, course_id } = req.body
        if (!student_id || !course_id) {
            return res.status(400).json({ message: "student_id va course_id bolishi kerak" });
          }

          
        const result = await pool.query('insert into enrollment values ($1, $2) RETURNING *', [student_id, course_id])
        res.status(200).json({ message: 'Ishladi br', data: result.rows })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Kursga yozilmadingiz.Xatoni dasturchilarga ayting' ,error})
    }
}  