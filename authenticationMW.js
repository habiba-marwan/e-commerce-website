const jwt = require("jsonwebtoken");
require("dotenv").config();
const express = require("express")

const verify = (req,res,next)=>{
//get the actual token
const bearerToken =  req.headers.authorization
// remove bearer from token
if (bearerToken && bearerToken.startsWith('Bearer ')) {
  // Extract the actual token from the Bearer token string
  const token = bearerToken.split(' ')[1];
  //to verify the token and return the data
  jwt.verify(token,process.env.JWT_KEY,(err,decoded)=>{
    if(err)
      return res.status(400).json(err)
    req.user = decoded

  })
  console.log("verified")
  next();
}
else{
return res.status(401).json({message:"unauthorized"})
}

}
module.exports = verify