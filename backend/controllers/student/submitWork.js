const pool = require('../../config/db')
require("dotenv").config();


const submitWork = async (req, res) => {
    try {
        const { title, grade } = req.body;
        const { taskId } = req.params;
        const {studentId} = req.query
        const filepath = req.file?.path

        if (!title || !filepath || !taskId || !studentId)
            return res.status(400).json({ message: "Missed required fields" });

        const result = await pool.query(
            "INSERT INTO studentwork (title, filepath, grade, task_id, student_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [title, filepath, grade ?? null, taskId, studentId]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = submitWork
