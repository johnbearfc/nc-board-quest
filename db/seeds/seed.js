const db = require('../connection.js');
const format = require('pg-format');
const { formatValues } = require('../utils/data-manipulation');

const seed = async (data) => {
  const { categoryData, commentData, reviewData, userData } = data;

  // DROP TABLES:
  await db.query(`
    DROP TABLE IF EXISTS comments;
    DROP TABLE IF EXISTS reviews;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS categories;`
  );

  // CREATE TABLES:
    // categories
  await db.query(
    `CREATE TABLE categories (
      slug VARCHAR(50) PRIMARY KEY,
      description TEXT NOT NULL
    );`
  );
    // users
  await db.query(
    `CREATE TABLE users (
      username VARCHAR(50) PRIMARY KEY,
      avatar_url TEXT,
      name TEXT NOT NULL
    );`
  );
    // reviews
  await db.query(
    `CREATE TABLE reviews (
      review_id SERIAL PRIMARY KEY,
      title VARCHAR(80) NOT NULL,
      review_body TEXT NOT NULL,
      designer VARCHAR(50) NOT NULL,
      review_img_url TEXT DEFAULT 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
      votes INT DEFAULT 0,
      category VARCHAR(50) REFERENCES categories(slug) NOT NULL,
      owner VARCHAR(50) references users(username) NOT NULL,
      created_at DATE DEFAULT CURRENT_DATE
    );`
  );
    // comments
  await db.query(
    `CREATE TABLE comments (
      comment_id SERIAL PRIMARY KEY,
      author VARCHAR(50) references users(username) NOT NULL,
      review_id INT REFERENCES reviews(review_id) NOT NULL,
      votes INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      body TEXT NOT NULL
    );`
  );

  // INSERT DATA:
    // categories
  const formattedCategories = formatValues(categoryData);
  const categoryQuery = format(
    `INSERT INTO categories
      (slug, description)
    VALUES
      %L;`,
    formattedCategories
  );
  await db.query(categoryQuery);

    // users
  const formattedUsers = formatValues(userData);
  const userQuery = format(
    `INSERT INTO users
      (username, avatar_url, name)
    VALUES
      %L;`,
    formattedUsers
  );
  await db.query(userQuery);
  

  const testTable = await db.query('SELECT * FROM users;')
  console.log(testTable.rows)



};

module.exports = seed;
