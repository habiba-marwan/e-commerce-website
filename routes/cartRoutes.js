const express = require("express")
const router = express.Router()
router.use(express.json())
const cartController = require("../controllers.js/cartController")
const verify = require("../authenticationMW")


router.get("/",verify,cartController.getCart)
router.get("/all",cartController.readAllCarts)
router.post("/",verify,cartController.addTocart)
router.delete("/remove",verify,cartController.removeItem)
router.delete("/",verify,cartController.clearCart)


module.exports = router