const {
    fetchReview 
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