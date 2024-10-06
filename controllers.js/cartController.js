const Cart = require('../models/cartModel')


const readAllCarts = async(req,res)=>{
    try {
        const carts = await Cart.find()
        return res.status(200).json(carts)
    } catch (error) {
        return res.status(500).json({message:error})
    }
}
const getCart = async (req,res)=>{
const id = req.user.userId
try{
const cart = await Cart.findOne({user:id}).populate('items.product')
console.log(cart)
if(!cart){
    const newCart = await Cart.create({
        items:[],
        user:id
    })
    return res.status(201).json({message:"cart successfully created",cart:newCart})
}
return res.status(200).json({message:"cart found",
    cart:cart
})
}catch(error){
   return  res.status(500).json({message:error})
}
}

const addTocart = async (req,res)=>{
    product = req.body.product
    id = req.user.userId
    const newItem = {
        product:product._id,
        quantity:1
    }
    try{
const userCart = await Cart.findOne({user:id})
//if this is the first product to be added
if(!userCart){
    const newCart = await Cart.create({
        items: [newItem],
        user: id
    })
    return res.status(201).json({message:"cart successfully created and item added",cart:newCart})
}
//if product is added,so we just increase quantity
   const targetItem = userCart.items.find(item => product._id.toString() === item.product.toString())
   if(targetItem != undefined){
        targetItem.quantity+=1
       await userCart.save()
       return res.status(200).json({message:"item added!",
        cart:userCart
       })
    }
 
//if product was not added before
userCart.items.push(newItem)
await userCart.save()
return res.status(200).json({message:"item added!",
    cart:userCart
   })
    }
    catch(error){
        res.status(500).json({message:error})
    }
}
const clearCart = async (req,res)=>{
   const id = req.user.userId
    try{
    const target = await Cart.findOne({user:id})
    if(!target)
        return res.status(404).json({message:"not found"})
    await Cart.findByIdAndDelete(target._id)
    console.log(target)
  return  res.status(200).json({message:"deleted successfully!", cart:target})
    }catch(error){
        return res.status(500).json({message:error})
    }
}

const removeItem = async (req,res)=>{
const productId = req.body.id
const id = req.user.userId
console.log(id)
console.log(productId)
try {
    const targetCart = await Cart.findOne({user:id})
    const index = targetCart.items.findIndex(item => item._id.toString() ===  productId.toString())
    if(index!=-1){
    targetCart.items.splice(index,1)
    console.log(targetCart)
    await targetCart.save()
    return res.status(200).json({message:"item removed",cart:targetCart})
    }
    else return res.status(404).json("cart not found")
} catch (error) {
    return res.status(500).json({message:error})
}
}


module.exports = {
    getCart,
    addTocart,
    clearCart,
    removeItem,
    readAllCarts
};


