const express = require('express');
const router = express.Router();
const db = require('../config/db'); 


router.get('/', (req, res) => {
  const sql = 'SELECT id, name, email, subject, department FROM teachers';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('O‘qituvchilarni olishda xatolik:', err);
      return res.status(500).json({ error: 'Server xatosi' });
    }

    res.status(200).json(results);
  });
});

module.exports = router;
