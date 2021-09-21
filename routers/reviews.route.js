const express = require('express');
const { 
    getReview, 
    patchReview, 
    getAllReviews 
} = require('../controllers/reviews.controller');

const reviewsRouter = express.Router();

reviewsRouter.get('/', getAllReviews);

reviewsRouter.route('/:review_id')
             .get(getReview)
             .patch(patchReview)   


module.exports = reviewsRouter;