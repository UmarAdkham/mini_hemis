const express = require('express');
const router = express.Router();
const viewAllUsers = require('../controllers/admin/viewAllUsers');


router.get('/users', viewAllUsers);

module.exports = router;
