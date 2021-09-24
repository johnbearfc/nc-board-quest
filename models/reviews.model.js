const db = require('../db/connection');

exports.fetchAllReviews = async (sort_by = 'created_at', order = 'ASC', category, limit = 10, p = 1) => {
    const offset = (p - 1) * limit;

    const validColumns = [
        'owner', 
        'title', 
        'review_id', 
        'category',  
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
        `SELECT reviews.*, count(comments.comment_id) as comment_count, count(*) OVER() as total
        FROM reviews 
        LEFT JOIN comments 
        ON reviews.review_id = comments.review_id`;
    const queryValues = [limit, offset];


    if (category) {
        queryStr += ` WHERE category = $3`
        queryValues.push(category);
    }

    queryStr += ` GROUP BY reviews.review_id
                  ORDER BY ${sort_by} ${order}
                  LIMIT $1 OFFSET $2;`


    const result = await db.query(queryStr, queryValues);
    let total_count = 0;

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

        total_count = 0;
    } else {
        total_count = Number(result.rows[0].total);
    }

    
    result.rows.forEach(review => {
        review.comment_count = Number(review.comment_count);
        delete review.total;  
    });
    
    return [total_count, result.rows];
}

exports.fetchReviewById = async (review_id) => {
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

    result.rows[0].comment_count = Number(result.rows[0].comment_count);

    return result.rows[0];
}

exports.updateReviewVotes = async (review_id, inc_votes) => {
    if (!inc_votes) {
        return Promise.reject({ status: 400, msg: 'Bad Request' });
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