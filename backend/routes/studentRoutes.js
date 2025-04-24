const express = require("express");

const studentRoute = express.Router();

const createStudent = require("../controllers/admin/createStudent");
const uploadMiddleware = require("../middlewares/uploadFile");
const { getAllCourses } = require("../controllers/teacher/viewCourses");
const { getStudenttask } = require("../controllers/student/viewGrade");

const submitWork = require("../controllers/student/submitWork");
const { checkRole } = require("../middlewares/checkRole");
const { viewCourseStudents } = require("../controllers/student/viewCourses");

studentRoute.use(checkRole(["student"]));
studentRoute.post("/", createStudent);
studentRoute.post("/submit/:task_id", uploadMiddleware, submitWork);
studentRoute.get("/view-grades/:student_id", getStudenttask);
studentRoute.get("/view-all-courses/", getAllCourses);
studentRoute.get("/view-my-courses/:student_id", viewCourseStudents);

module.exports = studentRoute;
