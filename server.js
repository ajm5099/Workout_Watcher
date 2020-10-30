const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutdb", { useNewUrlParser: true });

//=========================================================================
//WORKOUT ROUTES
//=========================================================================

//write the route to create a new workout

//Write the route to get all workouts

//Write the route to update the attributes of a specific workout

//Write the route to delete a specific workout

//=========================================================================
//EXERCISE ROUTES
//=========================================================================

//write the route to create a new exercise

//Write the route to get all exercises in a workout

//Write the route to update the attributes of a specific exercise

//Write the route to delete a specific exercise

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
