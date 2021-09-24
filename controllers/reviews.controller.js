const {
    fetchReviewById,
    updateReviewVotes, 
    fetchAllReviews
} = require('../models/reviews.model')

exports.getAllReviews = async (req, res, next) => {
    try {
        const { 
            sort_by, 
            order, 
            category,
            limit,
            p 
        } = req.query;

        const reviews = await fetchAllReviews(
            sort_by, order, category, limit, p
        );
        res.status(200).send({ reviews });
    } catch (err) {
        next(err);
    }
}

exports.getReviewById = async (req, res, next) => {
    try { 
        const { review_id } = req.params;

        const review = await fetchReviewById(review_id);
        res.status(200).send({ review });
    } catch (err) {
        next(err);
    }
}

exports.patchReviewVotes = async (req, res, next) => {
    try {
        const { review_id } = req.params;
        const { inc_votes } = req.body;

        const review = await updateReviewVotes(review_id, inc_votes);
        res.status(200).send({ review });
    } catch (err) {
        next(err);
    }
}