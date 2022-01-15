const express = require("express");
const router = express.Router();
const { getUser } = require("../controllers/user.controller");

router.route("/").get(getUser);

module.exports = router;
