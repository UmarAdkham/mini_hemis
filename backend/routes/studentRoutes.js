const express = require('express');
const createStudent = require('../controllers/admin/createStudent');
const uploadMiddleware = require('../middlewares/uploadFile');
const { submitTask } = require('../controllers/student/submitWork');


const studentRouter = express.Router();

studentRouter.post('/', createStudent);
studentRouter.post('/submit/:task_id', uploadMiddleware, submitTask);

module.exports = studentRouter;