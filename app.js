const express = require('express');
const apiRouter = require('./routers/api.route');
const { InvalidURL, handlePSQL400Errors, handleCustomErrors } = require('./err/error_handling');

const app = express();
app.use(express.json());

app.use('/api', apiRouter);

// ERROR HANDLING ------
app.use('/*', InvalidURL);
app.use(handlePSQL400Errors);
app.use(handleCustomErrors);


module.exports = app;