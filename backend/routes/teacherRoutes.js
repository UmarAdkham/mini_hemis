const express = require('express');
const createTeacher = require('../controllers/admin/createTeacher');

const router = express.Router();

router.post('/', createTeacher);

module.exports = router;