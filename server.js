const dotenv = require("dotenv"); // require package
dotenv.config(); // Loads the environment variables from .env file
// We begin by loading Express
const express = require('express');
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan"); 
const path = require("path");


const app = express();

// Add Middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));


// Connect to MongoDB/Mongoose
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});
const Fruit = require("./models/fruit.js");


// Routes
app.get("/", async (req, res) => {
    res.render("index.ejs", );
  });

app.get("/fruits/new", (req, res) => {
    res.render("fruits/new.ejs");
  });

app.get("/fruits/:fruitId/edit", async (req, res) => {

    // Get the fruit from the database
    const foundFruit = await Fruit.findById(req.params.fruitId);

    // Render the edit template and pass the fruit data to it
    res.render("fruits/edit.ejs", {
      fruit: foundFruit,
    });
  });

app.get("/fruits/:fruitId", async (req, res) => {
  const foundFruit = await Fruit.findById(req.params.fruitId);

  res.render("fruits/show.ejs", { fruit: foundFruit });

  });

app.delete("/fruits/:fruitId", async (req, res) => {
  await Fruit.findByIdAndDelete(req.params.fruitId);
  res.redirect("/fruits");
  });

app.put("/fruits/:fruitId", async (req, res) => {

  // Handle the 'isReadyToEat' checkbox data
  if (req.body.isReadyToEat === "on") {
    req.body.isReadyToEat = true;
  } else {
    req.body.isReadyToEat = false;
  }
  
  // Update the fruit in the database
  await Fruit.findByIdAndUpdate(req.params.fruitId, req.body);

  // Redirect to the fruit's show page to see the updates
  res.redirect(`/fruits/${req.params.fruitId}`);
});

app.post("/fruits", async (req, res) => {

    console.log("Before",req.body)

    if (req.body.isReadyToEat === "on") {
        req.body.isReadyToEat = true;
      } else {
        req.body.isReadyToEat = false;
      }

      console.log("After",req.body)

      await Fruit.create(req.body);
    res.redirect("/fruits");
  });

app.get("/fruits", async (req, res) => {

    // Get all the fruits from the database
    const allFruits = await Fruit.find();

    // Render the page that shows all the fruits
    res.render("fruits/index.ejs", { fruits: allFruits });

  });

app.get("/fruits/:fruitId/edit", async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.fruitId);
    res.render("fruits/edit.ejs", {
      fruit: foundFruit,
    });
  });

  
app.listen(3000, () => {
  console.log('Listening on port 3000');
});
