const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const PRODUCT_PATH = path.join("/uploads/products/product_image");

const productSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    marked_price: {
      type: Number,
      required: true,
    },
    selling_price: {
      type: Number,
      required: true,
    },
    sold_by: {
      type: String,
    },
    stock_quantity: {
      type: Number,
      required: true,
    },
    is_hidden: {
      type: Boolean,
      required: true,
    },
    is_deletable: {
      type: Boolean,
      required: true,
    },
    product_image: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", PRODUCT_PATH));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

//static methods
productSchema.statics.uploadProductImage = multer({ storage: storage }).single(
  "product_image"
);
productSchema.statics.productPath = PRODUCT_PATH;

if (!productSchema.options.toObject) productSchema.options.toObject = {};

//customizing user's object
productSchema.options.toObject.transform = function (doc, product, options) {
  delete product.is_hidden;
  delete product.createdAt;
  delete product.updatedAt;
  delete product.__v;
  return product;
};

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
