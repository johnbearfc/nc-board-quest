const express = require('express');
const { 
    getReview 
} = require('../controllers/reviews.controller');

const reviewsRouter = express.Router();

reviewsRouter.route('/:review_id')
             .get(getReview)   


module.exports = reviewsRouter;