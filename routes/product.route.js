const express = require("express");
const router = express.Router();
const {
  getProduct,
  getAllProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const { verifyTokenAndAdmin } = require("../middleware/index");
router.route("/find/:id").get(getProduct);
router.route("/").get(getAllProduct);
router.route("/create").post(verifyTokenAndAdmin, createProduct);
router.route("/update/:id").put(verifyTokenAndAdmin, updateProduct);
router.route("/delete/:id").delete(verifyTokenAndAdmin, deleteProduct);
module.exports = router;
