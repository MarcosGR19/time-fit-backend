const User = require('../models/users.model');
const bcrypt = require('bcrypt');
//---------------------------------INPUT---------------------------------

const getUsers = async(req,res) => {
    try {        
        const allUsers = await User.find();
        //Set Headers
        // res.setHeader('Access-Control-Allow-Credentials', true);
        // res.setHeader('Access-Control-Allow-Origin', '*');
        // res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
        // res.setHeader(
        //     'Access-Control-Allow-Headers',
        //     'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
        //Set Response
        res.status(200).json(allUsers);
    } catch (error) {
        return res.status(error?.code || 400).send({code:error?.code || 400, message:error?.message});
    }
};

const getUsersById = async (req,res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        if(user === null){
            return res.status(400).send({code:400, message:`Undefined user with id: ${id}`});
        }
        //Set Headers
        // res.setHeader('Access-Control-Allow-Credentials', true);
        // res.setHeader('Access-Control-Allow-Origin', '*');
        // res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
        // res.setHeader(
        //     'Access-Control-Allow-Headers',
        //     'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
        //Set Response
        res.status(200).json(user);        
    } catch (error) {
        return res.status(error?.code || 400).send({code:error?.code || 400, message:error?.message});
    }
};

const getUsersByEmail = async (req,res) => {
    try {
        const {email} = req.params;
        const user = await User.find({email:email});
        if(user === null){
            return res.status(400).send({code:400, message:`Undefined user with id: ${id}`});
        }
        //Set Headers
        // res.setHeader('Access-Control-Allow-Credentials', true);
        // res.setHeader('Access-Control-Allow-Origin', '*');
        // res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
        // res.setHeader(
        //     'Access-Control-Allow-Headers',
        //     'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
        //Set Response
        res.status(200).json(user);        
    } catch (error) {
        return res.status(error?.code || 400).send({code:error?.code || 400, message:error?.message});
    }
};

const postUser = async (req,res) => {
    try {
        const user = new User(req.body);
        //Check for required inputs
        if(user.email === undefined || user.password === undefined){
            return res.status(400).send({code:400, message:'Wrong input format'});
        }
        //Check if email not repeated
        const usersInDB = await User.find({email:user.email})
        if(usersInDB.length > 0){
            return res.status(400).send({code:400, message:'Duplicated Email'});
        }
        //Encrypt Password
        user.password = bcrypt.hashSync(user.password, 10);
        //Save User
        const createdUser = await user.save();
        //Set Headers
        // res.setHeader('Access-Control-Allow-Credentials', true);
        // res.setHeader('Access-Control-Allow-Origin', '*');
        // res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
        // res.setHeader(
        //     'Access-Control-Allow-Headers',
        //     'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
        //Set Response
        return res.status(200).json(createdUser);
    } catch (error) {
        return res.status(500).json(error);
    }
};


//---------------------------------OUTPUT---------------------------------
module.exports = {
    getUsers,
    getUsersById,
    postUser,
    getUsersByEmail
}
