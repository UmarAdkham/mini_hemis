const express = require("express");
const createTeacher = require("../controllers/admin/createTeacher");
const createStudent = require("../controllers/admin/createStudent");
const { createCourse } = require("../controllers/admin/createCourse");
const { deleteTeacher } = require("../controllers/admin/deleteTeacher");
const { deleteStudent } = require("../controllers/admin/deleteStudent");
const getAllTeachers = require("../controllers/admin/viewTeachers");
const viewStudents = require("../controllers/admin/viewStudents");

const adminRoute = express.Router();

adminRoute.get("/teachers", getAllTeachers);
adminRoute.get("/students", viewStudents);
adminRoute.post("/add-teacher", createTeacher);
adminRoute.post("/add-student", createStudent);
adminRoute.delete("/delete-teacher/:id", deleteTeacher);
adminRoute.delete("/delete-student/:id", deleteStudent);
adminRoute.post("/create-course", createCourse);

module.exports = adminRoute;
