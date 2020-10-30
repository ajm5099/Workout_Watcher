//=========================================================
//Use this as a guide
//=========================================================

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  name:{
    type: String,
    trim: true,
    required: "Workout name is required"
  },

  type:{
    type: String,
    trim: true,
    required: "Workout type is required"
  },
  
  weight: Number,
  
  sets: Number,

  reps: Number,

  Duration: Number,

  Distance: Number
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;