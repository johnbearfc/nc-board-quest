const express = require('express');
const apiRouter = require('./routers/api.route');
const listEndPoints = require('express-list-endpoints');
const { InvalidURL, handlePSQL400Errors, handleCustomErrors } = require('./err/error_handling');

const app = express();
app.use(express.json());

app.use('/api', apiRouter);

app.get('/api', (req, res) => {
    const endpoints = listEndPoints(app);

    endpoints.forEach(endpoint => delete endpoint.middlewares);

    res.status(200).send({ endpoints });
})

// ERROR HANDLING ------
app.use('/*', InvalidURL);
app.use(handlePSQL400Errors);
app.use(handleCustomErrors);

module.exports = app;