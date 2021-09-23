const db = require('../db/connection');


exports.fetchAllComments = async () => {
    const result = await db.query(
        `SELECT username FROM users;`
    );

    return result.rows;
}