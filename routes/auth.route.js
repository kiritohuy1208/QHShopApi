const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/auth.controller");

// REGISTER
router.route("/register").post(register);
//LOGIN
router.route("/login").post(login);
module.exports = router;
