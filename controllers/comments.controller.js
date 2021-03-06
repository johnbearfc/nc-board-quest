const { 
    fetchComments, 
    insertComment, 
    removeCommentById,
    updateCommentById 
} = require("../models/comments.model")


exports.getComments = async (req, res, next) => {
    try {
        const { review_id } = req.params;
        const { limit, p } = req.query;
    
        const comments = await fetchComments(review_id, limit, p);
        res.status(200).send({ comments });
    } catch (err) {
        next(err);
    }
}

exports.postComment = async (req, res, next) => {
    try {
        const { review_id } = req.params;
        const newComment = req.body;

        const comment = await insertComment(review_id, newComment);
        res.status(201).send({ comment });
    } catch (err) {
        next(err);
    }
}

exports.deleteCommentById = async (req, res, next) => {
    try {
        const { comment_id } = req.params;

        await removeCommentById(comment_id);
        res.status(204).send({});
    } catch (err) {
        next(err);
    }
}

exports.patchCommentById = async (req, res, next) => {
    try {
        const { comment_id } = req.params;
        const { inc_votes, body } = req.body;

        const comment = await updateCommentById(comment_id, inc_votes, body);
        res.status(200).send({ comment });
    } catch (err) {
        next(err);
    }
}