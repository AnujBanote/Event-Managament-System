///routes/auth.routes.js

const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/auth.controller");

// Public Authentication Routes
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
