const { fetchComments } = require("../models/comments.model")


exports.getComments = async (req, res, next) => {
    try {
        const { review_id } = req.params;
    
        const comments = await fetchComments(review_id);
        res.status(200).send({ comments });
    } catch (err) {
        next(err);
    }
}