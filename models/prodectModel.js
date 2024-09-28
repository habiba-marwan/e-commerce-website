const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String },
    description :{ type: String},
    discouunt: { type: Number},
    img:{ type: String }

  });

const Product = mongoose.model("Product",productSchema)

module.exports = Product;