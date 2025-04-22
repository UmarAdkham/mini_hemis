const express = require('express');

const createTeacher = require('../controllers/admin/createTeacher');
const gradeWork = require('../controllers/teacher/gradeStudent');

const router = express.Router();

router.post('/', createTeacher);
router.put('/:id/grade',gradeWork);

module.exports = router;
