const Product = require("../models/Product.model");
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    return res.status(200).json(product);
  } catch (err) {
    return res.status(500).json({
      errors: err.message,
    });
  }
};
exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const createdProduct = await newProduct.save();
    return res.status(200).json(createdProduct);
  } catch (err) {
    return res.status(500).json({
      errors: err.message,
    });
  }
};
exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: id },
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).json(updatedProduct);
  } catch (err) {
    return res.status(500).json({
      errors: err.message,
    });
  }
};
exports.getAllProduct = async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;
    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (qCategory) {
      products = await Product.find({
        categories: { $in: qCategory },
      });
    } else {
      products = await Product.find();
    }
    return res.status(200).json(products);
  } catch (err) {
    return res.status(500).json({
      errors: err.message,
    });
  }
};
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndRemove(id);
    return res.status(200).json("Product has been deleted");
  } catch (err) {
    return res.status(500).json({
      errors: err.message,
    });
  }
};
