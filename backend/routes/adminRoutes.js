const express = require("express");
const createTeacher = require("../controllers/admin/createTeacher");
const createStudent = require("../controllers/admin/createStudent");
const { createCourse } = require("../controllers/admin/createCourse");
const { deleteTeacher } = require("../controllers/admin/deleteTeacher");
const { deleteStudent } = require("../controllers/admin/deleteStudent");
const getAllTeachers = require("../controllers/admin/viewTeachers");

const adminRoute = express.Router();

adminRoute.post("/add-teacher", createTeacher);
adminRoute.get("/teachers", getAllTeachers);
adminRoute.post("/add-student", createStudent);
adminRoute.delete("/delete-teacher", deleteTeacher);
adminRoute.delete("/delete-student", deleteStudent);
adminRoute.post("/create-course", createCourse);

module.exports = adminRoute;
