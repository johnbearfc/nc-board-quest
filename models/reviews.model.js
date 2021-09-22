const db = require('../db/connection');

exports.fetchAllReviews = async (sort_by = 'created_at', order = 'ASC', category) => {
    const validColumns = [
        'owner', 
        'title', 
        'review_id', 
        'category', 
        'review_id', 
        'created_at',
        'votes',
        'comment_count'
    ];

    const validOrder = [
        'ASC', 
        'DESC'
    ];

    // checking for valid sort_by and order queries ------
    if(!validColumns.includes(sort_by) || !validOrder.includes(order.toUpperCase())) {
        return Promise.reject({ status: 400, msg: 'Bad Request' });
    }

    // building query string ------
    let queryStr = 
        `SELECT reviews.*, count(comments.comment_id) as comment_count 
        FROM reviews 
        LEFT JOIN comments 
        ON reviews.review_id = comments.review_id`;
    const queryValues = [];


    if (category) {
        queryStr += ` WHERE category = $1`
        queryValues.push(category);
    }

    queryStr += ` GROUP BY reviews.review_id
                  ORDER BY ${sort_by} ${order};`


    const result = await db.query(queryStr, queryValues);

    // checking if category is found ------
    if(!result.rows[0]) {
        const categoryResults = await db.query(
            `SELECT * FROM categories
            WHERE slug = $1`,
            [category]
        );

        if(!categoryResults.rows[0]) {
            return Promise.reject({ status: 404, msg: 'Not Found: category does not exist' });
        }
    }

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
        return Promise.reject({ status: 404, msg: 'Not Found: review does not exist' });
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