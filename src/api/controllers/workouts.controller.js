const Workout = require('../models/workout.model')

//---------------------------------INPUT---------------------------------

const getWorkouts = async(req,res) => {
    try {
        const allWorkouts = await Workout.find();
        res.status(200).json(allWorkouts);
    } catch (error) {
        return res.status(error?.code || 400).send({code:error?.code || 400, message:error?.message});
    }
};

const getWorkoutsById = async (req,res) => {
    try {
        const {id} = req.params;
        const workout = await Workout.findById(id);
        if(workout === null){
            return res.status(400).send({code:400, message:`Undefined workout with id: ${id}`});
        }
        res.status(200).json(workout);        
    } catch (error) {
        return res.status(error?.code || 400).send({code:error?.code || 400, message:error?.message});
    }
};

const postWorkout = async (req,res) => {
    try {
        const workout = new Workout(req.body);
        //Check for required inputs
        if(workout.user === undefined || workout.workout === undefined || workout.duration === undefined || workout.activeTime === undefined || workout.restTime === undefined){
            return res.status(400).send({code:400, message:'Wrong input format'});
        }
        //Save User
        const createdWorkout = await workout.save();
        return res.status(200).json(createdWorkout);
    } catch (error) {
        return res.status(500).json(error);
    }
};
//---------------------------------OUTPUT---------------------------------
module.exports = {
    getWorkouts,
    getWorkoutsById,
    postWorkout
}
