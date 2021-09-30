const {
    fetchCategories,
    insertCategory
} = require('../models/categories.model');

exports.getCategories = async (req, res, next) => {
    try {
        const categories = await fetchCategories();
    
        res.status(200).send({ categories });
    } catch (err) {
        next(err);
    }
}

exports.postCategory = async (req, res, next) => {
    try {
        const newCategory = req.body;
    
        const category = await insertCategory(newCategory);
        res.status(201).send({ category });
    } catch (err) {
        next(err);
    }
}