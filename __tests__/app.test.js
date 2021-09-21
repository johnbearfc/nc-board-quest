const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const seed = require('../db/seeds/seed.js');
const app = require("../app.js");
const request = require("supertest");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('handling unavailable route', () => {
    test('404 - returns error message when passed invalid URL', async () => {
        const { body } = await request(app)
            .get('/invalid')
            .expect(404);

        expect(body.msg).toBe('Invalid URL');
    });
});

describe('/api/categories', () => {
    describe('GET', () => {
        test('200 - returns array of all categories', async () => {
            const { body } = await request(app)
                .get('/api/categories')
                .expect(200);

            expect(body.categories).toHaveLength(4);
            body.categories.forEach(category => {
                expect(category).toMatchObject({
                    slug: expect.any(String),
                    description: expect.any(String),
                })
            })
        });
    });
});

describe('/api/reviews', () => {
    describe('GET', () => {
        test('200 - returns array of all reviews including comment_count for each, sorted by date by default', async () => {
            const { body } = await request(app)
                .get('/api/reviews')
                .expect(200)

            expect(body.reviews).toHaveLength(13);
            body.reviews.forEach(review => {
                expect(review).toMatchObject({
                    review_id: expect.any(Number),
                    title: expect.any(String),
                    review_body: expect.any(String),
                    designer: expect.any(String),
                    review_img_url: expect.any(String),
                    votes: expect.any(Number),
                    category: expect.any(String),
                    owner: expect.any(String),
                    created_at: expect.any(String),
                    comment_count: expect.any(String)
                });
            });
            // expect(body.reviews).toBeSortedBy('date');
        });
    });
    describe('/:review_id', () => {
        describe('GET', () => {
            test('200 - returns a correctly formatted review object with comment_count', async () => {
                const { body } = await request(app)
                    .get('/api/reviews/2')
                    .expect(200);

                expect(body.review).toMatchObject({
                    review_id: expect.any(Number),
                    title: expect.any(String),
                    review_body: expect.any(String),
                    designer: expect.any(String),
                    review_img_url: expect.any(String),
                    votes: expect.any(Number),
                    category: expect.any(String),
                    owner: expect.any(String),
                    created_at: expect.any(String),
                    comment_count: '3'
                })
            });
            test('400 - bad request: invalid review_id format', async () => {
                const { body } = await request(app)
                    .get('/api/reviews/invalid')
                    .expect(400);
                
                expect(body.msg).toBe('Bad Request');
            });
            test('404 - returns not found message when passed valid but non-existent review_id', async () => {
                const { body } = await request(app)
                    .get('/api/reviews/666')
                    .expect(404);

                expect(body.msg).toBe('Review Not Found');
            });
        });
        describe('PATCH', () => {
            test('200 - review votes successfully updated', async () => {
                const { body } = await request(app)
                    .patch('/api/reviews/1')
                    .send({ inc_votes : 1 })
                    .expect(200)
                
                expect(body.review.votes).toBe(2);
            });
            test('400 - bad request: invalid review_id format', async () => {
                const { body } = await request(app)
                    .get('/api/reviews/invalid')
                    .expect(400);
                
                expect(body.msg).toBe('Bad Request');
            });
            test('400 - bad request: invalid vote format', async () => {
                const { body } = await request(app)
                    .patch('/api/reviews/1')
                    .send({ inc_votes : 'dog' })
                    .expect(400)
                
                expect(body.msg).toBe('Bad Request');
            });
            test('400 - bad request: vote not included', async () => {
                const { body } = await request(app)
                    .patch('/api/reviews/1')
                    .send({})
                    .expect(400)
                
                expect(body.msg).toBe('Bad Request: vote not included');
            });
        });
    });
});
