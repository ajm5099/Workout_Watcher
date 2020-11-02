const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");
const { json } = require("express");
const { Workout } = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutdb", { useNewUrlParser: true });

//=========================================================================
//WORKOUT ROUTES
//=========================================================================

//route to create a new workout
app.post("/workouts/add", (req, res) =>{
    //Keep an eye on these curly braces when I start passing data with a nexercise
    db.Workout.create({ name: req.body.name })
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(({err}) => {
        res.json(err);
    });
})


// route to get all workouts
app.get("/workouts", (req, res) =>{
    db.Workout.find({})
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.json(err);
    });
});

//Write the route to delete a specific workout
app.delete("/api/workouts", ({body}, res) => {
        db.Workout.deleteOne({_id: body._id}, function(err){
            if(err) throw err;
            console.log("deleted sucessfully");
            res.redirect("/")
        });
    });

//=========================================================================
//EXERCISE ROUTES
//=========================================================================

//TODO:write the route to create a new exercise
app.post("/api/exercises", ({body}, res) => {
    const newObj = {
        name: req.body.name,
        type: req.body.type,
        weight: req.body.weight,
        sets: req.body.sets,
        reps: req.body.reps,
        duration: req.body.duration,
        distance: req.body.distance
    }
    db.Exercise.create(newObj)
    .then(({_id}) => db.Workout.findOneAndUpdate({_id: mongojs.ObjectId(req.params.id)}))
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        console.log(err);
        res.send(err);
    })
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
