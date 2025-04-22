const express = require("express");

const studentRoute = express.Router();

const { submitTask } = require("../controllers/student/submitWork");
const { getStudenttask } = require("../controllers/student/viewGrade");
const { getAllCourses } = require("../controllers/teacher/viewCourses");

studentRoute.post("/submit-work", submitTask);
studentRoute.get("/view-grades/:student_id", getStudenttask);
studentRoute.post("/view-courses", getAllCourses);

module.exports = studentRoute;
