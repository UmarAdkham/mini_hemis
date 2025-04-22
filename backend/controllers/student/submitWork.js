const pool = require("../../config/db");
require('dotenv').config();



exports.submitTask = async (req, res) => {
    try {
        const { title, description } = req.body
        const { course_id } = req.params

        if (!title || !description || !course_id) return res.status(400).json({ message: "Missed required fields" })

        const result = await pool.query('INSERT INTO task VALUES($1, $2, $3) RETURNING *', [title, description, course_id])
        res.status(201).json(result.rows[0])
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}

