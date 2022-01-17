const CryptoJS = require("crypto-js");
const User = require("../models/User.model");
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    return res.status(200).json(others);
  } catch (err) {
    return res.status(500).json({
      errors: err.message,
    });
  }
};
exports.putUser = async (req, res) => {
  // if update password
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).json(updatedUser);
  } catch (err) {
    return res.status(500).json({
      errors: err.message,
    });
  }
};
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    User.deleteOne({ id }).exec((err, deleteUser) => {
      if (err) {
        return res.status(500).json({
          errors: err.message,
        });
      }
      if (deleteUser) {
        return res.status(200).json({
          message: "User is deleted",
          deleteUser,
        });
      }
    });
  } catch (err) {
    return res.status(500).json({
      errors: err.message,
    });
  }
};
exports.getAllUser = async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({
      errors: err.message,
    });
  }
};
exports.getStast = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.getFullYear() - 1);
  try {
    const users = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } }, // lấy năm từ lasteyear
      {
        $project: {
          month: { $month: "$createdAt" }, // tạo 1 trường month giá trị là month creatAt
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({
      errors: err.message,
    });
  }
};
