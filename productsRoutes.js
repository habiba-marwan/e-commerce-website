const  productManager  = require("./productsManager");
const express = require("express")
const router = express.Router()
const manager = new productManager()
const jwt = require("jsonwebtoken");
require('dotenv').config();
const verify = require("./authenticationMW")
router.use(express.json())
const productsController = require('./productsController')


// enviroment variable
const port = process.env.port || 3000;

// to get all products

 router.get("/",productsController.readAllProducts)
 

// to read one product by id

  router.get("/:id", productsController.readOneById) 

 
//to add products to file 

  router.post("/add",productsController.createProduct) 

// to delete one product

  router.delete("/:id",verify, productsController.deleteOneById)  

//update student info

  router.patch("/:id",productsController.updateOneById) 

// get students in range
// alternative for url -> "/students/filter/?start=10&limit=30"
// acess it using req.query and its returned as a string
  router.get("/filter/:start/:limit",productsController.filterByPrice) 

module.exports = router ;