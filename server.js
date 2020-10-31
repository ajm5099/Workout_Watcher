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
app.post("/workouts/add", (req, res) =>{
    db.Workout.create( req.body.name )
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(({err}) => {
        res.json(err);
    });
})


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
app.put

//TODO:Write the route to delete a specific workout
app.delete("workout/:id", function(req, res) {
        db.Workout.deleteOne({
            where:{
                _id:req.params.id
            }
        }).then(data=>{
            if(data===0){
                res.status(404).json(data)
            }else {
                res.json(data)
            }
        }).catch(err=>{
            console.log(err);
            res.status(500).json(err);
        });
    });

//=========================================================================
//EXERCISE ROUTES
//=========================================================================

//TODO:write the route to create a new exercise
app.post("/submit/exercise/:workoutid", ({body}, res) => {
    db.Exercise.create(body)
    .then(({_id}) => db.Workout.findOneAndUpdate({ _id:req.params.workoutid}, { $push: {exercise: _id} }, { new: true }))
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.json(err);
    });
})

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

//TODO: START HERE, AND FINISH WRITING THIS FUNCTION!!!!!
app.put("exercise/:id", function (req, res) {
    db.Exercise.update({
        name: req.body.name,
        type: req.body.type,
        weight: req.body.weight,
        sets: req.body.sets,
        reps: req.body.reps,
        duration: req.body.duration,
        distance: req.bpody.distnace
    }).then(function (dbExercise) {
        res.json(dbExercise)
    }).catch(err => {
        console.log(err)
        res.status(500).json(err);
    });
});

//TODO:Write the route to delete a specific exercise
app.delete("exercise/:id", function(req, res) {
    db.Exercise.deleteOne({
        where:{
            _id:req.params.id
        }
    }).then(data=>{
        if(data===0){
            res.status(404).json(data)
        }else {
            res.json(data)
        }
    }).catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
});


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
