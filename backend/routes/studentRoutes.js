const express = require('express');
const studentRouter = express.Router();
const { getStudenttask, getFilepath, upload } = require('../controllers/student/viewGrade');
studentRouter.get('/:student_id', getStudenttask); // student_id bo'yicha ma'lumotlarni olish
studentRouter.post('/upload',upload, getFilepath); // Fayl yuklash
module.exports = studentRouter;