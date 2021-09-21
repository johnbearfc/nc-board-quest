const express = require('express');
const { 
    getReview, patchReview 
} = require('../controllers/reviews.controller');

const reviewsRouter = express.Router();

reviewsRouter.route('/:review_id')
             .get(getReview)
             .patch(patchReview)   


module.exports = reviewsRouter;