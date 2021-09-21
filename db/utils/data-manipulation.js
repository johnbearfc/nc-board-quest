const db = require('../connection.js');

exports.formatCategories = (categoryData) => {
    const formattedValues = categoryData.map(category => {
        return [
            category.slug,
            category.description
        ]
    });

    return formattedValues;
}

exports.formatUsers = (userData) => {
    const formattedValues = userData.map(user => {
        return [
            user.username,
            user.avatar_url,
            user.name
        ]
    });

    return formattedValues;
}

exports.formatReviews = (reviewData) => {
    const formattedValues = reviewData.map(review => {
        return [
            review.title,
            review.review_body,
            review.designer,
            review.review_img_url,
            review.votes,
            review.category,
            review.owner,
            review.created_at
        ]
    });

    return formattedValues;
}

exports.formatComments = (commentData) => {
    const formattedValues = commentData.map(comment => {
        return [
            comment.author,
            comment.review_id,
            comment.votes,
            comment.created_at,
            comment.body
        ]
    });

    return formattedValues;
}




  
