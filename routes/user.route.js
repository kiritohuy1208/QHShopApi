const express = require("express");
const router = express.Router();
const {
  getUser,
  putUser,
  deleteUser,
  getAllUser,
  getStast,
} = require("../controllers/user.controller");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/index");
router.route("/find/:id").get(verifyTokenAndAdmin, getUser);
router.route("/findAll").get(verifyTokenAndAdmin, getAllUser);
router.route("/stast").get(verifyTokenAndAdmin, getStast);
router.route("/:id").put(verifyTokenAndAuthorization, putUser);
router.route("/:id").delete(verifyTokenAndAdmin, deleteUser);

module.exports = router;
