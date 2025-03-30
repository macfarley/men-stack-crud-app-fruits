// Here is where we import modules
const dotenv = require("dotenv"); // require package
dotenv.config(); // Loads the environment variables from .env
const express = require('express');
const mongoose = require("mongoose"); // require package
const ejs = require("ejs"); // require package

  // Import the Fruit model
const Fruit = require("./models/fruit.js");
const app = express();

// Middleware to parse request body
app.use(express.urlencoded({ extended: false })); // Middleware to parse request body

//RESTful Routes
// Landing page route
app.get("/", async (req, res) => {
    res.render("index.ejs");
  });
// GET /fruits
app.get("/fruits", async (req, res) => {
    const allFruits = await Fruit.find();
    res.render("fruits/index.ejs", { fruits: allFruits });
  });
  
// GET /fruits/new
app.get("/fruits/new", (req, res) => {
    res.render("fruits/new.ejs");
  });
// POST /fruits
app.post("/fruits", async (req, res) => {
    if (req.body.isReadyToEat === "on") {
      req.body.isReadyToEat = true;
    } else {
      req.body.isReadyToEat = false;
    }
    await Fruit.create(req.body);
    res.redirect("/fruits"); // redirect to index fruits
  });
// show one fruit
app.get("/fruits/:fruitId", async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId);
    res.render("fruits/show.ejs", { fruit: foundFruit });
  });
  
  
 // Connect to MongoDB using the connection string in the .env file
mongoose.connect(process.env.MONGODB_URI);
// log connection status to terminal on start
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });



app.listen(3000, () => {
  console.log('Listening on port 3000');
});
