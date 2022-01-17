const express = require("express");
const router = express.Router();

const UserRouter = require("./user.route");
const ProductRouter = require("./product.route");
const OrderRouter = require("./order.route");
const CartRouter = require("./cart.route");
const AuthRouter = require("./auth.route");

router.use("/user", UserRouter);
router.use("/product", ProductRouter);
router.use("/cart", CartRouter);
router.use("/order", OrderRouter);
router.use("/auth", AuthRouter);
module.exports = router;
