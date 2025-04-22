const express = require("express");
const createTeacher = require("../controllers/admin/createTeacher");
const createStudent = require("../controllers/admin/createStudent");
const { deleteStudent } = require("../controllers/teacher/deleteStudent");
const { createCourse } = require("../controllers/admin/createCourse");

const adminRoute = express.Router();

adminRoute.post("/add-teacher", createTeacher);
adminRoute.post("/add-student", createStudent);
// adminRoute.delete("/delete-teacher", deleteTeacher);
adminRoute.delete("/delete-student", deleteStudent);
adminRoute.post("/create-course", createCourse);

module.exports = adminRoute;
