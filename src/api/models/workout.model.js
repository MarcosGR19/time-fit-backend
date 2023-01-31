const mongoose = require('mongoose');
//---------------------------------INPUT---------------------------------

// 1 - SCHEMA
const workoutSchema = mongoose.Schema(
    {
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required:true},
        workout: {type:'String', required:true},
        duration: {type:'String', required:true},
        activeTime: {type:'String', required:true},
        restTime: {type:'String', required:true}
    },
    {timestamps:true}
);

// 2 - MODELO Movie
const Workout = mongoose.model('workout',workoutSchema);

//---------------------------------OUTPUT---------------------------------
module.exports = Workout;