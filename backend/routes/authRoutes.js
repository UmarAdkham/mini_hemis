const express = require("express");
const { login } = require("../controllers/auth/login");

const authRoutes = express.Router();

authRoutes.get("/login", login);

module.exports = authRoutes;
