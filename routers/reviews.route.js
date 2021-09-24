const express = require('express');
const { 
    getReviewById, 
    patchReviewVotes, 
    getAllReviews 
} = require('../controllers/reviews.controller');
const { 
    getComments, 
    postComment 
} = require('../controllers/comments.controller');

const reviewsRouter = express.Router();

reviewsRouter.get('/', getAllReviews);

reviewsRouter.route('/:review_id')
             .get(getReviewById)
             .patch(patchReviewVotes)   

reviewsRouter.route('/:review_id/comments')
             .get(getComments)
             .post(postComment)   


module.exports = reviewsRouter;