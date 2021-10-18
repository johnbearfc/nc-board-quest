const express = require('express');
const apiRouter = require('./routers/api.route');
const listEndPoints = require('express-list-endpoints');
const { InvalidURL, handlePSQL400Errors, handleCustomErrors, handle500Errors } = require('./err/error_handling');
const { formatEndpoints } = require('./controllers/api.controller');
const cors = require('cors');

app.use(cors());

const app = express();
app.use(express.json());

app.use('/api', apiRouter);

app.get('/api', async (req, res) => {
    const listedEndpoints = listEndPoints(app);
    const endpoints = await formatEndpoints(listedEndpoints);

    res.status(200).send({ endpoints });
})

// ERROR HANDLING ------
app.use('/*', InvalidURL);
app.use(handlePSQL400Errors);
app.use(handleCustomErrors);
app.use(handle500Errors);

module.exports = app;