const express = require('express');
const { 
    getReview, 
    patchReview, 
    getAllReviews 
} = require('../controllers/reviews.controller');
const { 
    getComments 
} = require('../controllers/comments.controller');

const reviewsRouter = express.Router();

reviewsRouter.get('/', getAllReviews);

reviewsRouter.route('/:review_id')
             .get(getReview)
             .patch(patchReview)   

reviewsRouter.route('/:review_id/comments')
             .get(getComments)
            //  .post()   


module.exports = reviewsRouter;