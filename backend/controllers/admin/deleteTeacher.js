const express = require("express");
const app = express();
// teacherlarni o'chirish
app.delete('/teacher/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const result = await db.query('DELETE FROM users WHERE id = $1 AND role = $2 RETURNING *', [userId, 'teacher']);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Teacher topilmadi yoki bu user teacher emas' });
        }
        res.json({ message: 'Teacher o‘chirildi', deletedTeacher: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server xatosi' });
    }
});

module.exports = app;