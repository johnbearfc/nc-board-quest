const express = require('express');
const { 
    getReviewById, 
    patchReviewVotes, 
    getAllReviews,
    postReview,
    deleteReviewById
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
             .patch(patchReviewVotes)
             .delete(deleteReviewById) 

reviewsRouter.route('/:review_id/comments')
             .get(getComments)
             .post(postComment)   


module.exports = reviewsRouter;