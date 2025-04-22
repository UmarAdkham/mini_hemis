const express = require("express");
const app = express();
// teacherlarni o'chirish
exports.deleteTeacher = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM teacher WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "teacher not found" });
    }
    res.json({ message: "teacher deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
