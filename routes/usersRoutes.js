const express = require("express")
const router = express.Router()
router.use(express.json())
const usersController = require('../controllers.js/usersController')

//read all users
router.get("/",usersController.readUsers)

// to register new user
router.post("/register",usersController.register)

//to log in
router.post("/login",usersController.login)

//to check if user exists
router.get("/:userName",usersController.findUser)

//to delete a user
router.delete("/:id",usersController.deleteUser)





module.exports = router









