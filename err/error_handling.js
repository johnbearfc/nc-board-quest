exports.InvalidURL = ((req, res) => {
    res.status(404).send({ msg: 'Invalid URL' });
});

exports.handlePSQL400Errors = ((err, req, res, next) => {
    if (err.code === '22P02') {
        res.status(400).send({ msg: 'Bad Request' });
    } else {
        next(err);
    }
})