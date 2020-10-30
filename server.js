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

//TODO:write the route to create a new workout
//TODO: Be sure to modify this route to be based on user input
db.Workout.create({ name: "Change this name to be user input" })
.then(dbWorkout => {
    console.log(dbWorkout);
})
.catch(({message}) => {
    console.log(message);
});
//TODO:Write the route to get all workouts
app.get("/workouts", (req, res) =>{
    db.Workout.find({})
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.json(err);
    });
});

//TODO:Write the route to update the attributes of a specific workout

//TODO:Write the route to delete a specific workout

//=========================================================================
//EXERCISE ROUTES
//=========================================================================

//TODO:write the route to create a new exercise

//TODO:Write the route to get all exercises in a workout
app.get("/exercises", (req, res) =>{
    db.Exercise.find({})
    .then(dbExercise => {
        res.json(dbExercise);
    })
    .catch(err => {
        res.json(err);
    });
});

//TODO:Write the route to update the attributes of a specific exercise

//TODO:Write the route to delete a specific exercise

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
