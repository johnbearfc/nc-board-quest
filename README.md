# 🎲 Board Quest API 🎲

Welcome to the Board Quest API, a portfolio project designed to emulate a real world backend service.

Board Quest allows table top enthusiasts to explore the world of board games together and speak of their tales along the way.

Interacting with the API allows users to browse, post and vote on reviews and comments.

---

### Heroku App:

#### [nc-board-quest.herokuapp.com/api](https://nc-board-quest.herokuapp.com/api)

---

### Front End:

#### [github.com/johnbearfc/nc-games](https://github.com/johnbearfc/nc-games)

---

## Exploring the Project

**Requirements:**

The database is created with PSQL and interaction occurs through [node-postgres](https://node-postgres.com/). Therefore `Node.js v16.6.1` and `Postgres v13.3` or newer are required to run this project.

**Setup:**

1. Fork and clone this repository

2. Install all dependencies:

   - `npm install`  
     <br />

3. Create _two_ `.env` files: `.env.test` and `.env.development`. Into each, add `PGDATABASE=<database_name_here>`, with the correct database name for that environment (see `/db/setup.sql` for the database names).

4. Connect to the database:

   - `npm run setup-dbs`

   <br />

5. Seeding development data:

   - `npm run seed`

   <br />

6. Seeding and testing test data:

   - `npm test app`

   <br />

---

## Endpoints

All available endpoints can be viewed on the Heroku app with `/api`.

Within the project, endpoints can be navigated through `./app.js` and corresponding files in the `./routers` folder.

```http
GET /api
GET /api/categories
POST /api/categories
PATCH /api/comments/:comment_id
DELETE /api/comments/:comment_id
GET /api/reviews
POST /api/reviews
GET /api/reviews/:review_id
PATCH /api/reviews/:review_id
DELETE /api/reviews/:review_id
GET /api/reviews/:review_id/comments
POST /api/reviews/:review_id/comments
GET /api/reviews/:title
GET /api/users
POST /api/users
PATCH /api/users/username
```

#### 🎲 **GET /api/categories**

Responds with board game categories

<br />

#### 🎲 **POST /api/categories**

Request body accepts:

- an object in the form:

```json
{
  "slug": "category name here",
  "description": "description here"
}
```

Responds with:

- a category object containing the newly added category

<br />

#### 🎲 **PATCH /api/comments/:comment_id**

Allows user to change the body and/or number of votes linked to the `comment_id`

Request body accepts:

- an object in the form:

```json
{
  "inc_votes": "newVote",
  "body": "comment here"
}
```

- `newVote` will indicate how much the `votes` property in the database should be updated by, e.g.

  - `{ inc_votes : 1 }` would increment the current comment's vote property by 1
  - `{ inc_votes : -100 }` would decrement the current comment's vote property by 100

Responds with:

- the updated comment

<br />

#### 🎲 **DELETE /api/comments/:comment_id**

Deletes the given comment by `comment_id`

<br />

#### 🎲 **GET /api/reviews**

Responds with all the reviews

Accepts queries:

- `sort_by`, which sorts the reviews by any valid column (defaults to date)
- `order`, which can be set to `asc` or `desc` for ascending or descending (defaults to descending)
- `category`, which filters the reviews by the category value specified in the query
- `limit`, which limits the number of responses (defaults to 10)
- `p`, specifies the page at which to start

<br />

#### 🎲 **POST /api/reviews**

Request body accepts:

- an object with the following properties:

  - `owner` which is the `username` from the users table
  - `title`
  - `review_body`
  - `designer`
  - `category` which is a `category` from the categories table

Responds with:

- the newly added review, with all the above properties as well as:
  - `review_id`
  - `votes`
  - `created_at`
  - `comment_count`

<br />

#### 🎲 **GET /api/reviews/:review_id**

Responds with the review linked to the `review_id`

<br />

#### 🎲 **PATCH /api/reviews/:review_id**

Allows user to change the body and/or number of votes linked to the `review_id`

Request body accepts:

- an object in the form:

```json
{
  "inc_votes": "newVote",
  "review_body": "review here"
}
```

- `newVote` will indicate how much the `votes` property in the database should be updated by, e.g.

  - `{ inc_votes : 1 }` would increment the current review's vote property by 1
  - `{ inc_votes : -100 }` would decrement the current review's vote property by 100

Responds with:

- the updated review

<br />

#### 🎲 **DELETE /api/reviews/:review_id**

Should:

- delete the given review by review_id

Respond with:

- status 204 and no content

<br />

#### 🎲 **GET /api/reviews/:review_id/comments**

Responds with the comment linked to the `review_id`

Accepts queries:

- `limit`, which limits the number of responses (defaults to 10)
- `p`, specifies the page at which to start

<br />

#### 🎲 **POST /api/reviews/:review_id/comments**

Request body accepts:

- an object with the following properties:
  - `username`
  - `body`

Responds with:

- the posted comment

<br />

#### 🎲 **GET /api/reviews/:title**

Responds with the review linked to the `title`

<br />

#### 🎲 **GET /api/users**

Responds with all users

<br />

#### 🎲 **POST /api/users**

Request body accepts:

- an object in the form:

```json
{
  "username": "new username",
  "avatar_url": "new url",
  "name": "new name"
}
```

Responds with:

- the newly created user

<br />

#### 🎲 **PATCH /api/users/:username**

Allows user to edit the details of a user linked to the `username`

Request body accepts:

- an object in the form:

```json
{
  "username": "new username",
  "avatar_url": "new url",
  "name": "new name"
}
```

Responds with:

- the updated user

<br />

**Enjoy!**
