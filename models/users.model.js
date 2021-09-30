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

exports.updateUserByUsername = async (username, updatedDetails) => {
    const { new_username, avatar_url, name } = updatedDetails;

    console.log(new_username);
    if (avatar_url) {
        await db.query(
            `UPDATE users
            SET avatar_url = $1
            WHERE username = $2;`,
            [avatar_url, username]
        );
    }

    if (name) {
        await db.query(
            `UPDATE users
            SET name = $1
            WHERE username = $2;`,
            [name, username]
        );
    }

    // if (new_username) {
    //     await db.query(
    //         `UPDATE users
    //         SET username = $1
    //         WHERE username = $2;`,
    //         [new_username, username]
    //     );
    // }

    const result = await db.query(
        `SELECT * FROM users
        WHERE username = $1;`,
        [username]
    );

    console.log(result.rows);
}