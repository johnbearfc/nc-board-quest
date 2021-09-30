const db = require('../db/connection');

exports.fetchCategories = async () => {
    const result = await db.query(
        `SELECT * FROM categories;`
    )
    return result.rows;
}

exports.insertCategory = async (newCategory) => {
    const { slug, description } = newCategory

    const result = await db.query(
        `INSERT INTO categories
            (slug, description)
        VALUES
            ($1, $2)
        RETURNING *;`,
        [slug, description]
    );

    return result.rows[0];
}