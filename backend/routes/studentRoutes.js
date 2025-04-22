const express = require('express');
const router = express.Router();
const { getAllStudents } = require('../controllers/userController');

// GET /students - barcha studentlarni ko‘rish
router.get('/students', getAllStudents);

module.exports = router;