const db = require('../db/connection');


exports.fetchAllUsers = async () => {
    const result = await db.query(
        `SELECT username FROM users;`
    );

    return result.rows;
}

exports.fetchUserByUsername = async (username) => {
    const result = await db.query(
        `SELECT * FROM users
        WHERE username = $1;`,
        [username]
    );

    if (!result.rows[0]) {
        return Promise.reject({ status: 404, msg: 'Not Found: user does not exist' });

    }

    return result.rows[0];
}