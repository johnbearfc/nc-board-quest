const express = require('express');
const apiRouter = require('./routers/api.route');

const app = express();
app.use(express.json());

app.use('/api', apiRouter);

app.all('*', (req, res) => {
    res.status(404).send({ msg: 'Invalid URL!' });
})


module.exports = app;