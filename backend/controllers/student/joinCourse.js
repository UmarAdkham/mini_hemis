const pool = require("../../config/db");

exports.joinCourse = async (req, res) => {
    try {
        const { student_id, course_id } = req.query
        if (!student_id || !course_id) {
            return res.status(400).json({ message: "student_id va course_id kerak" });
          }
        const result = await pool.query('insert into enrollment values ($1, $2)', [student_id, course_id])
        res.status(200).json({ message: 'Ishladi br', data: result.rows })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Ubu Hato ciqti Bollada ayb yo' })
    }
}  