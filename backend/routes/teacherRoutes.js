const express = require('express');
const router = express.Router();
const gradeWork = require('../controllers/teacher/gradeStudent');
router.put('/:id/grade',gradeWork);


module.exports =  router