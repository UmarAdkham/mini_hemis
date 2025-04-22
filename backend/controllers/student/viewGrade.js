const pool = require('../config/db');
const multer = require('multer');
const path = require('path');
exports.upload = upload.single('file');

// Student ID bo'yicha ma'lumotlarni olish
exports.getFilepath = async (req, res) => {
    const { title, grade, student_id, task_id } = req.body;
    const filepath = req.file ? req.file.path : null;

    if (!filepath) {
        return res.status(400).json({ message: 'Fayl yuklanmadi' });
    }

    try {
        const query = `
            INSERT INTO student_tasks (title, grade, student_id, task_id, filepath)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `;
        const values = [title, grade, student_id, task_id, filepath];
        const result = await pool.query(query, values);

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Xato:', error);
        res.status(500).json({ message: 'Server xatosi' });
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, process.env.UPLOAD_DIR); // Fayllar ./uploads papkasiga saqlanadi
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${uniqueSuffix}-${file.originalname}`); // Fayl nomini unikal qilish
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB cheklov
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|pdf/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Faqat JPEG, PNG yoki PDF fayllar ruxsat etiladi!'));
        }
    },
});

// Fayl yuklash (POST)
exports.getFilepath = upload.single('file'), async (req, res) => {
    const { title, grade, student_id, task_id } = req.body;
    const filepath = req.file ? req.file.path : null;

    if (!filepath) {
        return res.status(400).json({ message: 'Fayl yuklanmadi' });
    }

    try {
        const query = `
        INSERT INTO student_tasks ( title, grade, student_id, task_id, filepath)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
      `;
        const values = [title, grade, student_id, task_id, filepath];
        const result = await pool.query(query, values);

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Xato:', error);
        res.status(500).json({ message: 'Server xatosi' });
    }
};