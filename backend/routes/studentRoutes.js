const express = require('express');
const router = express.Router();
const { getStudenttask } = require('../controllers/student/viewGrade');
router.get('/:student_id', getStudenttask); // student_id bo'yicha ma'lumotlarni olish
module.exports = router;