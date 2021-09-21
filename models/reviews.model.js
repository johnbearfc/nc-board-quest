const db = require('../db/connection');

exports.fetchReview = async (review_id) => {
    const result = await db.query(
        `SELECT reviews.*, count(comments.comment_id) as comment_count FROM reviews 
        LEFT JOIN comments 
        ON reviews.review_id = comments.review_id
        WHERE reviews.review_id = $1
        GROUP BY reviews.review_id;`, 
        [review_id]
    )
    return result.rows[0];
}