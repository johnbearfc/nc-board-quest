const {
    fetchAllUsers,
    fetchUserByUsername,
    updateUserByUsername
} = require('../models/users.model');


exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await fetchAllUsers();
        res.status(200).send({ users });
    } catch (err) {
        next(err);
    }
}

exports.getUserByUsername = async (req, res, next) => {
    try {
        const { username } = req.params;
        
        const user = await fetchUserByUsername(username);
        res.status(200).send({ user });
    } catch (err) {
        next(err);
    }

}

exports.patchUserByUsername = async (req, res, next) => {
    try {
        const { username } = req.params;
        const updatedDetails = req.body;

        const user = await updateUserByUsername(username, updatedDetails);
        res.status(200).send({ user });
    } catch (err) {
        console.log(err);
        next(err)
    }
}