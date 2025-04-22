const pool = require("../../config/db");

exports.createCourse = async (req, res) => {
  const { name, teacher_id } = req.body;

  // Input tekshiruv: agar `name` yoki `teacher_id` yo'q bo'lsa
  if (!name || !teacher_id) {
      return res.status(400).json({
          error: 'Course name and teacher ID are required'
      });
  }

  try {
      const query = `
          INSERT INTO courses (name, teacher_id) 
          VALUES ($1, $2) 
          RETURNING *
      `;
      const values = [name.trim(), teacher_id];
      const { rows } = await pool.query(query, values);

      return res.status(201).json({
          message: 'Course created successfully',
          course: rows[0]
      });
  } catch (error) {
      console.error('Error creating course:', error.message);
      return res.status(500).json({ 
          error: 'Failed to create course',
          details: error.message
      });
  }
};
