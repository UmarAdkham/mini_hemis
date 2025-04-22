const express = require("express");

const studentRoute = express.Router();

const createStudent = require("../controllers/admin/createStudent");
const uploadMiddleware = require("../middlewares/uploadFile");
const { submitTask } = require("../controllers/student/submitWork");
const { getAllCourses } = require("../controllers/teacher/viewCourses");

studentRoute.post("/", createStudent);
studentRoute.post("/submit/:task_id", uploadMiddleware, submitTask);
studentRoute.post("/submit-work", submitTask);
studentRoute.get("/view-grades/:student_id", getStudenttask);
studentRoute.post("/view-courses", getAllCourses);

studentRoute.post("/", createStudent);
studentRoute.post("/submit/:task_id", uploadMiddleware, submitTask);
studentRoute.post("/submit-work", submitTask);
studentRoute.get("/view-grades/:student_id", getStudenttask);
studentRoute.post("/view-courses", getAllCourses);

module.exports = studentRoute;
