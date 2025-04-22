const pool = require("../../config/db");

exports.filterStudentsByGrade = async (req, res) => {
  try {
    const { grade } = req.query;

    if (!grade) {
      return res.status(400).json({ message: "Adminjon Bahoni krtingxay endi iltimos" });
    }

    const query = `
      SELECT id, firstname, lastname, grade 
      FROM students
      WHERE grade = $1
      ORDER BY lastname ASC, firstname ASC
    `;

    const result = await pool.query(query, [grade]);

    res.status(200).json({
      data: result.rows,
    });
  } catch (error) {
    console.error("Xatolik:", error);
    res.status(500).json({ message: "Server xatosi yuz berdi" });
  }
};

