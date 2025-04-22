const express = require('express');

const studentRouter = express.Router();

const { getStudenttask, getFilepath, upload } = require('../controllers/student/viewGrade');


const createStudent = require('../controllers/admin/createStudent');
const submitTask = require('../controllers/student/submitWork');


studentRouter.post('/', createStudent);
studentRouter.post('/task/:course_id', submitTask);
studentRouter.get('/:student_id', getStudenttask); // student_id bo'yicha ma'lumotlarni olish
studentRouter.post('/upload',upload, getFilepath); // Fayl yuklash

module.exports = studentRouter;