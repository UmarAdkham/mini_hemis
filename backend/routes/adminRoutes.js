const express = require("express");
const { filterStudentsByGrade } = require("../controllers/admin/filterStudentsbyGrade");

const adminRouter = express.Router();

adminRouter.get("/filter-students", filterStudentsByGrade);

module.exports = adminRouter;