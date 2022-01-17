const Order = require("../models/Order.model");
exports.getOrder = async (req, res) => {
  try {
    const Order = await Order.findOne({ userId: req.params.userId });
    return res.status(200).json(Order);
  } catch (err) {
    return res.status(500).json({
      errors: err.message,
    });
  }
};
exports.getAllOrder = async (req, res) => {
  try {
    const Order = await Order.find();
    return res.status(200).json(Order);
  } catch (err) {
    return res.status(500).json({
      errors: err.message,
    });
  }
};
exports.createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const createdOrder = await newOrder.save();
    return res.status(200).json(createdOrder);
  } catch (err) {
    return res.status(500).json({
      errors: err.message,
    });
  }
};
exports.updateOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedOrder = await Order.findByIdAndUpdate(
      { _id: id },
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).json(updatedOrder);
  } catch (err) {
    return res.status(500).json({
      errors: err.message,
    });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    await Order.findByIdAndRemove(id);
    return res.status(200).json("Order has been deleted");
  } catch (err) {
    return res.status(500).json({
      errors: err.message,
    });
  }
};
exports.getInCome = async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth()) - 1);
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
    ]);
    return res.status(200).json(income);
  } catch (err) {
    return res.status(500).json({
      errors: err.message,
    });
  }
};
