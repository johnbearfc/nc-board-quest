const express = require('express');
const {
    getAllUsers,
    getUserByUsername,
    patchUserByUsername
} = require('../controllers/users.controller');

const usersRouter = express.Router();

usersRouter.get('/', getAllUsers);

usersRouter.route('/:username')
           .get(getUserByUsername)
           .patch(patchUserByUsername)

module.exports = usersRouter;