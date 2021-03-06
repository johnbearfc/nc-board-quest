const {
    fetchReviewById,
    updateReviewById, 
    fetchAllReviews,
    insertReview,
    removeReviewById,
    fetchReviewByTitle
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

        const reviewsObj = {
            total_count: reviews[0],
            reviews: reviews[1]
        }

        res.status(200).send(reviewsObj);
    } catch (err) {
        next(err);
    }
}

exports.getReviewById = async (req, res, next) => {
    try { 
        const { review_id } = req.params;

        if (!Number(review_id)) {
            next();
        } else {
            const review = await fetchReviewById(review_id);
            res.status(200).send({ review });
        }
    } catch (err) {
        next(err);
    }
}

exports.patchReviewById = async (req, res, next) => {
    try {
        const { review_id } = req.params;
        const { inc_votes, review_body } = req.body;

        const review = await updateReviewById(review_id, inc_votes, review_body);
        res.status(200).send({ review });
    } catch (err) {
        next(err);
    }
}

exports.postReview = async (req, res, next) => {
    try {
        const newReview = req.body;

        const review = await insertReview(newReview);
        res.status(201).send({ review });
    } catch (err) {
        next(err);
    }
}

exports.deleteReviewById = async (req, res, next) => {
    try {
        const { review_id } = req.params;

        await removeReviewById(review_id);
        res.status(204).send({});
    } catch (err) {
        next(err);
    }
}

exports.getReviewByTitle = async (req, res, next) => {
    try {
        const { title } = req.params;

        const review = await fetchReviewByTitle(title);
        res.status(200).send({ review });
    } catch (err) {
        // console.log(err);
        next(err);
    }
}