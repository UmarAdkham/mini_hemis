const express = require("express");
const { login } = require("../controllers/auth/login");
const { editProfile } = require("../controllers/auth/editProfile");

const authRoutes = express.Router();

authRoutes.get("/login", login);
authRoutes.patch("/:user_id/edit-profile", editProfile);

module.exports = authRoutes;
