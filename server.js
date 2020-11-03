const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const mongojs = require("mongojs")

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
app.post("/api/workouts", ({ body }, res) => {

    db.Workout.create({ name: body.name })
        .then(dbWorkout => {
            console.log(dbWorkout);
            res.send(dbWorkout);
        })
        .catch(({ err }) => {
            res.json(err);
        });
})


// route to get all workouts
app.get("/workouts", (req, res) => {
    db.Workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

//Write the route to delete a specific workout
app.delete("/api/workouts", ({ body }, res) => {
    db.Workout.deleteOne({ _id: body._id }, function (err) {
        if (err) throw err;
        console.log("deleted sucessfully");
        res.redirect("/")
    });
});

//=========================================================================
//EXERCISE ROUTES
//=========================================================================

//write the route to create a new exercise
app.post("/api/exercises/:id", (req, res) => {
    const body = req.body
    const newObj = {
        name: body.name,
        type: body.type,
        weight: body.weight,
        sets: body.sets,
        reps: body.reps,
        duration: body.duration,
        distance: body.distance
    }
    db.Exercise.create(newObj)
    console.log(newObj)
        .then(({ _id }) => db.Workout.findOneAndUpdate({ _id: req.params.id }, { $push: { exercise: _id } }, { new: true })
        )
        .then(dbWorkout => {
            console.log('dbWorkout', dbWorkout)
            res.json(dbWorkout);
        })
        .catch(err => {
            console.log(err);
            res.send(err);
        })
})

//Write the route to get all exercises in a workout
app.get("/exercises", (req, res) => {
    db.Exercise.find({})
        .then(dbExercise => {
            res.json(dbExercise);
        })
        .catch(err => {
            res.json(err);
        });
});

app.put("/api/exercises", (req, res) => {
  
    db.Exercise.findOneAndUpdate({_id: req.body._id}, req.body, { new: true })
    .then(dbExercise => {
        res.send(dbExercise);
        console.log(dbExercise);
    })
    .catch(err => {
        res.send(err);
        console.log(err);
    })

})

// TODO:Write the route to delete a specific exercise
app.delete("/api/exercise/:id", function (req, res) {
    db.Exercise.deleteOne(
        {
            _id: req.params.id
        }
    ).then(data => {
        if (data === 0) {
            res.status(404).json(data)
        } else {
            res.json(data)
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});
