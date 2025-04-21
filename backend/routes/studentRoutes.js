const express = require('express');
const createStudent = require('../controllers/admin/createStudent');
const submitTask = require('../controllers/student/submitWork');

const studentRouter = express.Router();

studentRouter.post('/', createStudent);
studentRouter.post('/task/:course_id', submitTask);

module.exports = studentRouter;