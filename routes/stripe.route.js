const express = require("express");
const router = express.Router();
const { stripeController } = require("../controllers/stripe.controller");

router.route("/post").post(stripeController);

module.exports = router;
