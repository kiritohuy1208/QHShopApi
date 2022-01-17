const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrder,
  getAllOrder,
  updateOrder,
  deleteOrder,
  getInCome,
} = require("../controllers/order.controller");
const {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("../middleware/index");
router.route("/find/:userId").get(verifyTokenAndAuthorization, getOrder);
router.route("/").get(verifyTokenAndAdmin, getAllOrder);
router.route("/income").get(verifyTokenAndAdmin, getInCome);
router.route("/create").post(verifyTokenAndAuthorization, createOrder);
router.route("/update/:id").put(verifyTokenAndAdmin, updateOrder);
router.route("/delete/:id").delete(verifyTokenAndAdmin, deleteOrder);
module.exports = router;
