const express = require('express');
const {
    getWorkouts,
    getWorkoutsById,
    postWorkout
} = require('../controllers/workouts.controller')

//---------------------------------INPUT---------------------------------

const router = express.Router();

router.get('/:id', getWorkoutsById);
router.get('/', getWorkouts);

router.post('/', postWorkout);

//---------------------------------OUTPUT---------------------------------
module.exports = router;
