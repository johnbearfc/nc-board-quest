const {
    fetchCategories
} = require('../models/categories.model');

exports.getCategories = async (req, res, next) => {
    const categories = await fetchCategories();

    res.status(200).send({ categories });
}