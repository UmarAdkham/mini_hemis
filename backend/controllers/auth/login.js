const pool = require("../config/db");
// const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Invalid username or password" });
    }
    const result = await pool.query(
      `SELECT id, firstname, lastname, username FROM users WHERE username = $1 and password = $2`,
      [username, password]
    );
    res.status(200).json({ message: "invalid message" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("There is something wrong with the server.");
  }
};
