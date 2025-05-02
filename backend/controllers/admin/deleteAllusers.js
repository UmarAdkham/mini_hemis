const pool = require('../../config/db')


exports.deleteUser = async (req, res) => {
  try {
    const {id} = req.params; // URL parametridan id olish

    if (!id || isNaN(id)) {
      return res.status(400).json({ xabar: "To'g'ri id kerak" });
    }

    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ xabar: "Foydalanuvchi topilmadi" });
    }

    res.status(200).json({
      xabar: "Foydalanuvchi muvaffaqiyatli o'chirildi",
      oshirilganFoydalanuvchi: result.rows[0],
    });
  } catch (error) {
    console.error("Foydalanuvchi o'chirishda xato:", error);
    res.status(500).json({ xabar: "Ichki server xatosi" });
  }
};