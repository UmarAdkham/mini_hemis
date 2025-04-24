const pool = require("../../db");

const addTask = async (req, res) => {
    try {
        const { title, description, course_id } = req.body;
        const result = await pool.query(
            'INSERT INTO tasks (title, description, course_id) VALUES ($1, $2, $3) RETURNING *',
            [title, description, course_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error adding task:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const viewAllTasks = async (req, res) => {
    try {
        const { course_id } = req.query;
        let result;

        if (course_id) {
            result = await pool.query('SELECT * FROM tasks WHERE course_id = $1', [course_id]);
        } else {
            result = await pool.query('SELECT * FROM tasks');
        }

        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching tasks:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const viewStudentWork = async (reqm, res) => {
    try {
        const { taskId } = req.params;
        const result = await pool.query(
            `SELECT sw.id, sw.title, sw.filepath, sw.grade, u.firstname, u.lastname
           FROM studentWork sw
           JOIN users u ON sw.student_id = u.id
           WHERE sw.task_id = $1`,
            [taskId]
        );
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching student work:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { addTask, viewAllTasks, viewStudentWork }
