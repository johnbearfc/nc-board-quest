const db = require('../db/connection');

exports.fetchAllReviews = async (sort_by = 'date') => {
    const result = await db.query(
        `SELECT reviews.*, count(comments.comment_id) as comment_count FROM reviews 
        LEFT JOIN comments 
        ON reviews.review_id = comments.review_id
        GROUP BY reviews.review_id
        ORDER BY $1 ASC
        `,
        [sort_by]
    );
    
    return result.rows;
}

exports.fetchReview = async (review_id) => {
    const result = await db.query(
        `SELECT reviews.*, count(comments.comment_id) as comment_count FROM reviews 
        LEFT JOIN comments 
        ON reviews.review_id = comments.review_id
        WHERE reviews.review_id = $1
        GROUP BY reviews.review_id;`, 
        [review_id]
    );

    if(!result.rows[0]) {
        return Promise.reject({ status: 404, msg: 'Review Not Found' });
    }

    return result.rows[0];
}

exports.updateReview = async (review_id, inc_votes) => {
    if (!inc_votes) {
        return Promise.reject({ status: 400, msg: 'Bad Request: vote not included' });
    }

    const result = await db.query(
        `UPDATE reviews
        SET votes = votes + $1
        WHERE review_id = $2
        RETURNING *;`,
        [inc_votes, review_id]
    );

    return result.rows[0];
}