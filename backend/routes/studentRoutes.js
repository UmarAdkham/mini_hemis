const express = require("express");

const studentRoute = express.Router();

const { submitTask } = require("../controllers/student/submitWork");
const { getAllCourses } = require("../controllers/student/viewCourses");

studentRoute.post("/submit-work", submitTask);
studentRoute.post("/view-courses", getAllCourses);

module.exports = studentRoute;
