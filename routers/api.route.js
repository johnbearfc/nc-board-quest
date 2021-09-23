const express = require('express');
const categoriesRouter = require('./categories.route');
const reviewsRouter = require('./reviews.route');
const commentsRouter = require('./comments.route');

const apiRouter = express.Router();

apiRouter.use('/categories', categoriesRouter);

apiRouter.use('/reviews', reviewsRouter);

apiRouter.use('/comments', commentsRouter);


module.exports = apiRouter;