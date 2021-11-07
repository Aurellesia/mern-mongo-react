const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    price: {
      type: Number,
      required: true,
      min: 1000,
      max: 100000000,
    },
    stock: {
      type: Number,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    image_url: {
      type: String,
    },
  },
  { versionKey: false }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
