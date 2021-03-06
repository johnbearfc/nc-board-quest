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

    if (!new_username && !avatar_url && !name) {
        return Promise.reject({ status: 400, msg: 'Bad Request' });
    }

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

    if (new_username) {
        await db.query(
            `UPDATE users
            SET username = $1
            WHERE username = $2;`,
            [new_username, username]
        );

        username = new_username;
    }

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

exports.insertNewUser = async (username, avatar_url, name) => {
    if (avatar_url) {
        await db.query(
            `INSERT INTO users
                (username, avatar_url, name)
            VALUES
                ($1, $2, $3)
            RETURNING *;`,
            [username, avatar_url, name]
        );
    } else {
        await db.query(
            `INSERT INTO users
                (username, name)
            VALUES
                ($1, $2)
            RETURNING *;`,
            [username, name]
        );
    }

    const result = await db.query(
        `SELECT * FROM users
        WHERE username = $1`,
        [username]
    );

    return result.rows[0];
}