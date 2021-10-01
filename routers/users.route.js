const express = require('express');
const {
    getAllUsers,
    getUserByUsername,
    patchUserByUsername,
    postNewUser
} = require('../controllers/users.controller');

const usersRouter = express.Router();

usersRouter.route('/')
           .get(getAllUsers)
           .post(postNewUser)

usersRouter.route('/:username')
           .get(getUserByUsername)
           .patch(patchUserByUsername)

module.exports = usersRouter;