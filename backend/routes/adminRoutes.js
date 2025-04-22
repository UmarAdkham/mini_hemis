const express = require("express");
const createTeacher = require("../controllers/admin/createTeacher");
const createStudent = require("../controllers/admin/createStudent");

const adminRoute = express.Router();

adminRoute.post("/add-teacher", createTeacher);
adminRoute.post("/add-student", createStudent);
// adminRoute.delete("/delete-teacher", deleteTeacher);

module.exports = adminRoute;
