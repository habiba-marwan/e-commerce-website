const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const cartSchema = new mongoose.Schema({
  items: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, required: true },
    },
  ],
  user: { 
    type: Schema.Types.ObjectId,
     ref: "user",
     required:true

   },
  });

const Cart = mongoose.model("Cart",cartSchema)

module.exports = Cart;