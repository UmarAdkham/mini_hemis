const express = require('express');
const createStudent = require('../controllers/admin/createStudent');

const router = express.Router();

router.post('/', createStudent);

module.exports = router;