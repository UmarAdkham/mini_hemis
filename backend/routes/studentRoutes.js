const express = require("express");

const studentRoute = express.Router();

const { submitTask } = require("../controllers/student/submitWork");

studentRoute.post("/submit-work", submitTask);

module.exports = studentRoute;
