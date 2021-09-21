const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const seed = require('../db/seeds/seed.js');
const app = require("../app.js");
const request = require("supertest");

beforeEach(() => seed(testData));
afterAll(() => db.end());

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
