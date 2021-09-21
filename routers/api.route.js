const express = require('express');
const categoriesRouter = require('./categories.route');
const reviewsRouter = require('./reviews.route');

const apiRouter = express.Router();

apiRouter.use('/categories', categoriesRouter);

apiRouter.use('/reviews', reviewsRouter);


module.exports = apiRouter;