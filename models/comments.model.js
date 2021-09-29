const db = require('../db/connection');

exports.fetchComments = async (review_id, limit = 10, p = 1) => {
    const offset = (p - 1) * limit;
    
    const result = await db.query(
        `SELECT comment_id, votes, created_at, author, body
        FROM comments
        WHERE review_id = $1
        LIMIT $2 OFFSET $3;`,
        [review_id, limit, offset]
    );

    if (!result.rows[0]) {
        const reviewsResult = await db.query(
            `SELECT * FROM reviews
            WHERE review_id = $1`,
            [review_id] 
        );

        if (!reviewsResult.rows[0]) {
            return Promise.reject({ status: 404, msg: 'Not Found: review does not exist' })
        }
    }

    return result.rows;
}

exports.insertComment = async (review_id, newComment) => {
    const { username, body } = newComment;

    const checkReviews = await db.query(
        `SELECT * FROM reviews
        WHERE review_id = $1;`,
        [review_id]
    );

    if(!checkReviews.rows[0]) {
        return Promise.reject({ status: 404, msg: 'Not Found: review does not exist' });
    }

    const result = await db.query(
        `INSERT INTO comments
            (review_id, author, body)
        VALUES
            ($1, $2, $3)
        RETURNING *;`,
        [review_id, username, body]
    );

    return result.rows[0];
}

exports.removeCommentById = async (comment_id) => {
    const result = await db.query(
        `DELETE FROM comments
        WHERE comment_id = $1
        RETURNING *;`,
        [comment_id]
    );
    
    if(!result.rows[0]) {
        return Promise.reject({ status: 404, msg: 'Not Found: comment does not exist' });
    }
}

exports.updateCommentVotes = async (comment_id, inc_votes) => {
    if (!inc_votes) {
        return Promise.reject({ status: 400, msg: 'Bad Request' });
    }
    
    const result = await db.query(
        `UPDATE comments
        SET votes = votes + $1
        WHERE comment_id = $2
        RETURNING *;`,
        [inc_votes, comment_id]
    );

    return result.rows[0];
}