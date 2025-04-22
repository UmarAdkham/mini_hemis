const express = require('express');
const createStudent = require('../controllers/admin/createStudent');
const uploadMiddleware = require('../middlewares/uploadFile');
const { submitTask } = require('../controllers/student/submitWork');

const express = require("express");

const studentRoute = express.Router();


studentRouter.post('/', createStudent);
studentRouter.post('/submit/:task_id', uploadMiddleware, submitTask);

const { submitTask } = require("../controllers/student/submitWork");
const { getStudenttask } = require("../controllers/student/viewGrade");
const { getAllCourses } = require("../controllers/teacher/viewCourses");

studentRoute.post("/submit-work", submitTask);
studentRoute.get("/view-grades/:student_id", getStudenttask);
studentRoute.post("/view-courses", getAllCourses);

module.exports = studentRoute;
