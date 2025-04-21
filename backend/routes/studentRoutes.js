const express = require('express');
const studentRouter = express.Router();
const { getStudenttask } = require('../controllers/student/viewGrade');
studentRouter.get('/:student_id', getStudenttask); // student_id bo'yicha ma'lumotlarni olish
module.exports = studentRouter;