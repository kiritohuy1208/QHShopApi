const Cart = require("../models/Cart.model");
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    return res.status(200).json(cart);
  } catch (err) {
    return res.status(500).json({
      errors: err.message,
    });
  }
};
exports.getAllCart = async (req, res) => {
  try {
    const Cart = await Cart.find();
    return res.status(200).json(Cart);
  } catch (err) {
    return res.status(500).json({
      errors: err.message,
    });
  }
};
exports.createCart = async (req, res) => {
  try {
    const newCart = new Cart(req.body);
    const createdCart = await newCart.save();
    return res.status(200).json(createdCart);
  } catch (err) {
    return res.status(500).json({
      errors: err.message,
    });
  }
};
exports.updateCart = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedCart = await Cart.findByIdAndUpdate(
      { _id: id },
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).json(updatedCart);
  } catch (err) {
    return res.status(500).json({
      errors: err.message,
    });
  }
};

exports.deleteCart = async (req, res) => {
  try {
    const { id } = req.params;
    await Cart.findByIdAndRemove(id);
    return res.status(200).json("Cart has been deleted");
  } catch (err) {
    return res.status(500).json({
      errors: err.message,
    });
  }
};
