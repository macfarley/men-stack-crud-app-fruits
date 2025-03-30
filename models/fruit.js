// models/fruit.js

const mongoose = require("mongoose");

const fruitSchema = new mongoose.Schema({
    name: String,
    isReadyToEat: Boolean,
  });

const Fruit = mongoose.model("Fruit", fruitSchema); // create model
// The model is created using the schema we defined above

//export the model so we can use it in other files
// This allows us to interact with the fruits collection in our MongoDB database
// We can perform CRUD operations using this model
// For example, we can create new fruits, read existing fruits, update them, or delete them.
module.exports = Fruit;
