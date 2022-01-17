const User = require("../models/User.model");
const CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");
exports.register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    const newUser = new User({
      userName,
      email,
      password: CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString(),
    });
    const savedUser = await newUser.save();
    return res.status(201).json({ savedUser });
  } catch (error) {
    // console.log(error);
    return res.status(400).json({
      error: error.message,
    });
  }
};
exports.login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    if (user) {
      const hashedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.PASS_SEC
      );
      const isPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
      if (isPassword === password) {
        const accessToken = jwt.sign(
          {
            id: user.id,
            isAdmin: user.isAdmin,
          },
          process.env.SECREST_JWT,
          { expiresIn: "3d" }
        );
        res.cookie("token", accessToken, { expiresIn: "3d" });
        const { password, ...others } = user._doc;
        return res.status(200).json({
          ...others,
          accessToken,
        });
      } else {
        return res.status(401).json({
          error: "Wrong credetials",
        });
      }
    } else {
      return res.status(401).json({
        error: "Not found user",
      });
    }
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
};
