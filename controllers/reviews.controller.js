const {
    fetchReview,
    updateReview 
} = require('../models/reviews.model')

exports.getReview = async (req, res, next) => {
    try { 
        const { review_id } = req.params;

        const review = await fetchReview(review_id);
        res.status(200).send({ review });
    } catch (err) {
        next(err);
    }
}

exports.patchReview = async (req, res, next) => {
    try {
        const { review_id } = req.params;
        const { inc_votes } = req.body;

        const review = await updateReview(review_id, inc_votes);
        res.status(200).send({ review });
    } catch (err) {
        next(err);
    }
}