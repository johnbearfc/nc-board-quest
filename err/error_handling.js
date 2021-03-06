exports.InvalidURL = ((req, res) => {
    res.status(404).send({ msg: 'Invalid URL' });
});


exports.handlePSQL400Errors = ((err, req, res, next) => {
    const PSQLBadReqCodes = [
        '22P02',
        '23503',
        '23502',
        '23505'
    ];
    if (PSQLBadReqCodes.includes(err.code)) {
        res.status(400).send({ msg: 'Bad Request' });
    } else {
        next(err);
    }
});

exports.handleCustomErrors = ((err, req, res, next) => {
    if (err.status) {
        res.status(err.status).send({ msg: err.msg });
    } else {
        next(err);
    }
});

exports.handle500Errors = ((err, req, res, next) => {
    console.log(err);
    res.status(500).send({msg: 'Internal Server Error'});
})