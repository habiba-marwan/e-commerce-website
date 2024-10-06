const express = require("express");
const app = express();
const productsRoutes = require("./routes/productsRoutes");
const usersRoutes = require("./routes/usersRoutes");
const cartRoutes = require("./routes/cartRoutes")
const cors = require("cors");
const PORT = +process.env.PORT || 3000;
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://habibamarwan698:qhrGUEJAsM9CeM4W@cluster0.itlrl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
)

mongoose.connection.once("open",()=>{
  console.log("connected to mongo")
}).on("error",()=>{
  console.warn("failed connection")
})
app.use(express.json());
// productsRoutes

//cros
app.use(cors());

// APPLICATION LEVEL MIDDLEWARE
app.use((request, response, next) => {
    console.log(
      `${new Date().toString()} - ${request.method} - ${request.url}  `,
      request.body
    );
    next();
  });
  app.use("/products", productsRoutes);
  app.use("/users",usersRoutes)
  app.use("/cart",cartRoutes)
  //  productsRoutes / usersRoutes-> acts as a middleware to be done before handling the request
// run server
app.listen(PORT, () => {
  console.log("Server is running @ port", PORT);
});