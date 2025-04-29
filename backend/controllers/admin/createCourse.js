const pool = require("../../config/db");

exports.createCourse = async (req, res) => {
  const { name, username } = req.body;

  // Input validation: Check if `name` or `username` is missing
  if (!name || !username) {
    return res.status(400).json({
      error: 'Course name and username are required',
    });
  }

  try {
    // Step 1: Find teacher_id based on username
    const teacherQuery = `
      SELECT id FROM users WHERE username = $1
    `;
    const teacherResult = await pool.query(teacherQuery, [username.trim()]);

    if (teacherResult.rows.length === 0) {
      return res.status(404).json({
        error: 'Teacher with the provided username not found',
      });
    }

    const teacher_id = teacherResult.rows[0].id;

    // Step 2: Insert course with teacher_id
    const courseQuery = `
      INSERT INTO courses (name, teacher_id) 
      VALUES ($1, $2) 
      RETURNING *
    `;
    const courseValues = [name.trim(), teacher_id];
    const { rows } = await pool.query(courseQuery, courseValues);

    return res.status(201).json({
      message: 'Course created successfully',
      course: rows[0],
    });
  } catch (error) {
    console.error('Error creating course:', error.message);
    return res.status(500).json({
      error: 'Failed to create course',
      details: error.message,
    });
  }
};