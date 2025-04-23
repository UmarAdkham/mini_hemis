const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL ma'lumotlar bazasiga ulanish
const pool = new Pool({
  connectionString: process.env.DB_URL, // .env faylidan DB_URL ni o'qiydi
});

// Studentlarni filtrlash endpointi
exports.filterAllStudentsByGrade = async (req, res) => {
  const { sortBy } = req.query; // sortBy = 'name' yoki 'grade'

  try {
    let query = "SELECT * FROM students";

    // Buyerda tanlangan sorovga qarab talabalarni filtirlash uchun postgresql ga sorov yuboriladi
    if (sortBy === "name") {
      query += " ORDER BY name ASC"; // Alfavit bo'yicha tartiblash
    } else if (sortBy === "grade") {
      query += " ORDER BY grade DESC"; // Baholar bo'yicha tartiblash
    }

    // Ma'lumotlar bazasidan so'rovni bajarish
    const result = await pool.query(query);
    res.status(200).json(result.rows); // Natijalarni JSON formatida qaytarish
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
