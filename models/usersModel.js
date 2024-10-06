const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
   userName:{ type:String,
        required:true
       },
    password:{
        type:String,
        required:true
       }
    });

const user = mongoose.model("user",userSchema)

module.exports = user;