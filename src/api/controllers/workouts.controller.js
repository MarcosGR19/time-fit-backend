const Workout = require('../models/workout.model')

//---------------------------------INPUT---------------------------------

const getWorkouts = async(req,res) => {
    try {
        const allWorkouts = await Workout.find();
        //Set Headers
        // res.setHeader('Access-Control-Allow-Credentials', true);
        // res.setHeader('Access-Control-Allow-Origin', '*');
        // res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
        // res.setHeader(
        //     'Access-Control-Allow-Headers',
        //     'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
        //Set Response
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
        //Set Headers
        // res.setHeader('Access-Control-Allow-Credentials', true);
        // res.setHeader('Access-Control-Allow-Origin', '*');
        // res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
        // res.setHeader(
        //     'Access-Control-Allow-Headers',
        //     'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
        //Set Response
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
        //Set Headers
        // res.setHeader('Access-Control-Allow-Credentials', true);
        // res.setHeader('Access-Control-Allow-Origin', '*');
        // res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
        // res.setHeader(
        //     'Access-Control-Allow-Headers',
        //     'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
        //Set Response
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
