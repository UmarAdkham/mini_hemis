const express = require("express");

// Student o'chirish
exports.deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM student WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
