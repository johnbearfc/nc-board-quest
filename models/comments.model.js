const db = require('../db/connection');

exports.fetchComments = async (review_id) => {
    const result = await db.query(
        `SELECT comment_id, votes, created_at, author, body
        FROM comments
        WHERE review_id = $1;`,
        [review_id]
    );

    if (!result.rows[0]) {
        const reviewsResult = await db.query(
            `SELECT * FROM reviews
            WHERE review_id = $1;`,
            [review_id]
        );

        if (!reviewsResult.rows[0]) {
            return Promise.reject({ status: 404, msg: 'Not Found: review does not exist' })
        }
    }

    return result.rows;
}