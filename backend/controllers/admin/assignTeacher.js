const assignTeacher = async (req, res) => {
    const { teacherId } = req.params;
    const { courseId } = req.body;
    const query = 'UPDATE courses SET teacher_id = $1 WHERE id = $2 RETURNING *';
    try {
        const result = await pool.query(query, [teacherId, courseId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json({ message: 'Teacher assigned successfully', course: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
