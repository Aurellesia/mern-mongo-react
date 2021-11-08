const Product = require("../models/productSchema");
const path = require("path");
const fs = require("fs");

const index = async (req, res) => {
  const { keyword } = req.query;
  let result = {};
  try {
    if (keyword) {
      result = await Product.findOne({ name: keyword }).exec();
      res.send(result);
    } else {
      result = await Product.find();
      res.send(result);
    }
  } catch (e) {
    res.send(e);
  }
};

const view = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Product.findById(id).exec();
    res.send(result);
  } catch (e) {
    res.send(e);
  }
};

const store = async (req, res) => {
  const { name, price, stock, status } = req.body;
  const image = req.file;
  let data = {};
  try {
    const target = path.join(__dirname, "../public", image.originalname);
    fs.renameSync(image.path, target);
    data = new Product({
      name,
      price,
      stock,
      status,
      image_url: `https://mern-one-backend.herokuapp.com/static/${image.originalname}`,
    });
    const result = await data.save();
    res.send(result);
  } catch (e) {
    res.send(e);
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, price, stock, status } = req.body;
  const image = req.file;
  let result = {};
  if (image) {
    try {
      const target = path.join(__dirname, "../public", image.originalname);
      fs.renameSync(image.path, target);
      result = await Product.updateOne(
        { _id: id },
        {
          name,
          price,
          stock,
          status,
          image_url: `https://mern-one-backend.herokuapp.com/static/${image.originalname}`,
        }
      );
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  } else {
    try {
      result = await Product.updateOne(
        { _id: id },
        {
          name,
          price,
          stock,
          status,
        }
      );
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  }
};

const destroy = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Product.deleteOne({ _id: id });
    res.send(result);
  } catch (e) {
    res.send(e);
  }
};

module.exports = { index, view, store, update, destroy };
