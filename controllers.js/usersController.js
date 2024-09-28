const user = require('../models/usersModel')
const bcrypt = require('bcrypt')
const saltRounds = 10

const readUsers = async(req,res)=>{
    try{
        const users = await user.find()
        res.status(200).json(users)
    }
    catch(err){
    res.status(400).json("users couldn't be read")
    
}
}
const addUser = async (newUser)=>{
    try{
         await user.create(newUser)
        return newUser.userName
    }
    catch(err){
    res.status(500).json(err)
}
}

const findUser = async (username)=>{
    try{
        const targetUser = await user.findOne({userName:{$eq:username}}).exec()
        if(targetUser)
        return targetUser
    return null
    }
    catch(err){
    return err
}
}
const deleteUser = async (req,res)=>{
    try {
        const targetUser = await user.findByIdAndDelete(req.params.id)
        if(targetUser)
            return res.status(200).json("deleted successfully")
        res.status(404).json("user not found")
    } catch (error) {
        res.status(500).json(error)
    }
}

const register = async(req,res)=>{
    //check if username exists
    const {userName,password} = req.body
    const newUser = await findUser(userName)
     if(newUser)
        res.status(400).json("username already exists")
    //username does not exists do we will add it to the DB
    else{
        bcrypt.hash(password,saltRounds).then(async (hashed)=>{
         const hashedPassword = hashed
         try{
            const result = await addUser(
             {
                 userName:userName,
                 password:hashedPassword
             },res
            );
          res.status(201).json({
             message:"user added",
             user:result
         
          })
         }
         catch(err){
             res.status(500).json("user couldn't be added");
         }
         
        })
     
}
}
const login = async (req,res)=>{
const {userName,password} = req.body
const match = await findUser(userName)
if(!match)
    return res.status(400).json("invalid credentials")
//check using same hash algo
bcrypt.compare(password,match.password).then((result)=>{
    if(!result)
        return res.status(400).json("invalid credentials")
else return res.status(200).json("successfully logged in")
}
)




}
module.exports = {
    addUser,
    findUser,
    readUsers,
    deleteUser,
    register,
    login
}