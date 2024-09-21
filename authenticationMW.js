const jwt = require("jsonwebtoken");
require("dotenv").config();
const express = require("express")

const verify = (req,res,next)=>{
    const apiKey = req.headers["x-api-key"]
    if(!apiKey) return res.sendStatus(401);
    if (apiKey === "m1e"){
        const accessToken = jwt.sign(
           {apiKey: "M1e"},
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "60s" }
          
        );
        const refreshToken = jwt.sign(
          {apiKey: "M1e"},
         process.env.REFRESH_TOKEN_SECRET,
         { expiresIn: "1d" }
         
       ); 
       res.cookie('jwt',refreshToken,{ httpOnly:true, maxAge : 24*60*60*1000} )
       res.json({ accessToken }) ; // for front-end to store it in memory
       next();
      }
      else res.sendStatus(403);

}
module.exports = verify