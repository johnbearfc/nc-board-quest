const express = require('express');
const { 
    getReviewById, 
    patchReviewById, 
    getAllReviews,
    postReview,
    deleteReviewById,
    getReviewByTitle
} = require('../controllers/reviews.controller');
const { 
    getComments, 
    postComment 
} = require('../controllers/comments.controller');

const reviewsRouter = express.Router();

reviewsRouter.route('/')
             .get(getAllReviews)
             .post(postReview)

reviewsRouter.route('/:review_id')
             .get(getReviewById)
             .patch(patchReviewById)
             .delete(deleteReviewById) 

reviewsRouter.route('/:review_id/comments')
             .get(getComments)
             .post(postComment)   

reviewsRouter.get('/:title', getReviewByTitle);


module.exports = reviewsRouter;