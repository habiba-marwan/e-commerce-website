const mongoose = require('mongoose')


const cartSchema = new mongoose.Schema({
  items: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, required: true },
    },
  ],
  user: { type: Schema.Types.ObjectId, ref: "User" },
  });

const cartProduct = mongoose.model("cartProduct",cartSchema)

module.exports = cartProduct;