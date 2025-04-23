const express = require("express");
const createTeacher = require("../controllers/admin/createTeacher");
const createStudent = require("../controllers/admin/createStudent");
const { createCourse } = require("../controllers/admin/createCourse");
const { removeStudentFromCourse } = require("../controllers/admin/deleteTeacher");
const { deleteStudent } = require("../controllers/admin/deleteStudent");
const getAllTeachers = require("../controllers/admin/viewTeachers");
const viewStudents = require("../controllers/admin/viewStudents");
const {
  filterAllStudentsByGrade,
} = require("../controllers/admin/filterAllStudentsByGrade");
const { checkRole } = require("../middlewares/checkRole");
const { viewAllUsers } = require("../controllers/admin/viewAllUsers");

const adminRoute = express.Router();

adminRoute.use(checkRole(["admin"]));

adminRoute.get("/users", viewAllUsers)
adminRoute.get("/teachers", getAllTeachers);
adminRoute.get("/students", viewStudents);
adminRoute.post("/add-teacher", createTeacher);
adminRoute.post("/add-student", createStudent);
adminRoute.get("/filter-students", filterAllStudentsByGrade);
adminRoute.delete("/delete-teacher/:id", removeStudentFromCourse);
adminRoute.delete("/delete-student/:id", deleteStudent);
adminRoute.post("/create-course", createCourse);

module.exports = adminRoute;
