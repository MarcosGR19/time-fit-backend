const express = require('express');
const {
    getUsers, getUsersById, postUser, getUsersByEmail
} = require('../controllers/users.controller')

//---------------------------------INPUT---------------------------------

const router = express.Router();

router.get('/email/:email', getUsersByEmail);
router.get('/:id', getUsersById);
router.get('/', getUsers);

router.post('/', postUser);

//---------------------------------OUTPUT---------------------------------
module.exports = router;
