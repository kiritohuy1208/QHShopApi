const express = require("express");
const router = express.Router();
const {
  createCart,
  getCart,
  getAllCart,
  updateCart,
  deleteCart,
} = require("../controllers/cart.controller");
const { verifyTokenAndAuthorization } = require("../middleware/index");
router.route("/find/:userId").get(verifyTokenAndAuthorization, getCart);
router.route("/").get(verifyTokenAndAuthorization, getAllCart);
router.route("/create").post(verifyTokenAndAuthorization, createCart);
router.route("/update/:id").put(verifyTokenAndAuthorization, updateCart);
router.route("/delete/:id").delete(verifyTokenAndAuthorization, deleteCart);
module.exports = router;
