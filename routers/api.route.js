const express = require('express');
const categoriesRouter = require('./categories.route');

const apiRouter = express.Router();

apiRouter.use('/categories', categoriesRouter);


module.exports = apiRouter;