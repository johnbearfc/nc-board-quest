const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const seed = require('../db/seeds/seed.js');
const app = require("../app.js");
const request = require("supertest");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('handling invalid path', () => {
    test('404 - not found: invalid URL', async () => {
        const { body } = await request(app)
            .get('/invalid')
            .expect(404);

        expect(body.msg).toBe('Invalid URL');
    });
});

describe('/api', () => {
    describe('GET', () => {
        test('200 - describes all possible endpoints', async () => {
            const { body } = await request(app)
                .get('/api')
                .expect(200)

                body.endpoints.forEach(endpoint => {
                    expect(endpoint).toMatchObject({
                        path: expect.any(String),
                        methods: expect.any(Array)
                    })
                })
        });
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
        test('200 - returns array of first 10 reviews by default, including comment_count for each and sorted by ascending date by default', async () => {
            const { body } = await request(app)
                .get('/api/reviews')
                .expect(200)

            expect(body.reviews).toHaveLength(10);
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
                    comment_count: expect.any(Number)
                });
            });
            expect(body.reviews).toBeSortedBy('created_at');
            expect(body.total_count).toBe(13);
        });
        test('200 - returns reviews ordered by queried sort_by', async () => {
            const { body } = await request(app)
                .get('/api/reviews?sort_by=review_id')
                .expect(200)
            
            expect(body.reviews).toBeSortedBy('review_id');
        });
        test('200 - returns reviews ordered by queried ASC/DESC order', async () => {
            const { body } = await request(app)
                .get('/api/reviews?order=DESC')
                .expect(200)
            
            expect(body.reviews).toBeSortedBy('created_at', { descending: true });
        });
        test('200 - returns reviews filtered by queried category', async () => {
            const { body } = await request(app)
                .get('/api/reviews?category=dexterity')
                .expect(200)
            
            expect(body.reviews).toHaveLength(1);
        });
        test('400 - bad request: ?sort_by = invalid column', async () => {
            const { body } = await request(app)
                .get('/api/reviews?sort_by=invalid')
                .expect(400)
            
            expect(body.msg).toBe('Bad Request');
        });
        test('400 - bad request: ?order = invalid order format', async () => {
            const { body } = await request(app)
                .get('/api/reviews?order=invalid')
                .expect(400)
            
            expect(body.msg).toBe('Bad Request');
        });
        test('404 - not found: ?category = nonexistent category', async () => {
            const { body } = await request(app)
                .get('/api/reviews?category=dog')
                .expect(404)
            
            expect(body.msg).toBe('Not Found: category does not exist');
        });
        test('200 - OK: ?category = category exists but without any associated reviews', async () => {
            const { body } = await request(app)
                .get('/api/reviews?category=children\'s games')
                .expect(200)
            
            expect(body.reviews).toHaveLength(0);
        });
        test('200 - ?limit = returns first specified number of reviews', async () => {
            const { body } = await request(app)
                .get('/api/reviews?limit=2')
                .expect(200)
            
            expect(body.reviews).toHaveLength(2);
        });
        test('200 - ?p = returns with specified page', async () => {
            const { body } = await request(app)
                .get('/api/reviews?p=2')
                .expect(200)

            expect(body.reviews).toHaveLength(3);
        });
        test('200 - ?p = returns with specified page and limit', async () => {
            const { body } = await request(app)
                .get('/api/reviews?limit=2&p=2&sort_by=review_id')
                .expect(200)

            expect(body.reviews).toHaveLength(2);
            expect(body.reviews[0].review_id).toBe(3);
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
                    comment_count: 3
                })
            });
            test('400 - bad request: invalid review_id format', async () => {
                const { body } = await request(app)
                    .get('/api/reviews/invalid')
                    .expect(400);
                
                expect(body.msg).toBe('Bad Request');
            });
            test('404 - not found: valid but non-existent review_id', async () => {
                const { body } = await request(app)
                    .get('/api/reviews/666')
                    .expect(404);

                expect(body.msg).toBe('Not Found: review does not exist');
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
                    .patch('/api/reviews/invalid')
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
                
                expect(body.msg).toBe('Bad Request');
            });
        });
        describe('/comments', () => {
            describe('GET', () => {
                test('200 - returns with first 10 comments by default for given review_id', async () => {
                    const { body } = await request(app)
                        .get('/api/reviews/2/comments')
                        .expect(200);

                    expect(body.comments).toHaveLength(3)
                    body.comments.forEach(comment => {
                        expect(comment).toMatchObject({
                            comment_id: expect.any(Number),
                            votes: expect.any(Number),
                            created_at: expect.any(String),
                            author: expect.any(String),
                            body: expect.any(String)
                        })
                    })
                });
                test('400 - bad request: invalid review_id format', async () => {
                    const { body } = await request(app)
                        .get('/api/reviews/invalid/comments')
                        .expect(400);
                    
                    expect(body.msg).toBe('Bad Request');
                });
                test('404 - not found: valid but non-existent review_id', async () => {
                    const { body } = await request(app)
                        .get('/api/reviews/666/comments')
                        .expect(404);
    
                    expect(body.msg).toBe('Not Found: review does not exist');
                });
                test('200 - OK: review exists but without any comments', async () => {
                    const { body } = await request(app)
                        .get('/api/reviews/1/comments')
                        .expect(200)
                    
                    expect(body.comments).toHaveLength(0);
                });
                test('200 - ?limit = returns first specified number of comments', async () => {
                    const { body } = await request(app)
                        .get('/api/reviews/3/comments?limit=2')
                        .expect(200)
                    
                    expect(body.comments).toHaveLength(2);
                });
                test('200 - ?p = returns with specified page and limit', async () => {
                    const { body } = await request(app)
                        .get('/api/reviews/3/comments?limit=2&p=2')
                        .expect(200)
        
                    expect(body.comments).toHaveLength(1);
                });
            });
            describe('POST', () => {
                test('201 - comment successfully posted', async () => {
                    const { body } = await request(app)
                        .post('/api/reviews/1/comments')
                        .send({
                            username: 'bainesface',
                            body: 'just amazing'
                        })
                        .expect(201)

                    expect(body.comment.comment_id).toBe(7);
                    expect(body.comment.author).toBe('bainesface');
                    expect(body.comment.body).toBe('just amazing');
                });
                test('400 - bad request: invalid review_id format', async () => {
                    const { body } = await request(app)
                        .post('/api/reviews/invalid/comments')
                        .expect(400);
                    
                    expect(body.msg).toBe('Bad Request');
                });
                test('400 - bad request: invalid post format', async () => {
                    const { body } = await request(app)
                        .post('/api/reviews/1/comments')
                        .send({
                            username: 'john',
                            body: 'just ok'
                        })
                        .expect(400);
                    
                    expect(body.msg).toBe('Bad Request');
                });
                test('400 - bad request: post body incomplete', async () => {
                    const { body } = await request(app)
                        .post('/api/reviews/1/comments')
                        .send({})
                        .expect(400);
                    
                    expect(body.msg).toBe('Bad Request');
                });
            });
        });
    });
});

describe('/api/comments', () => {
    describe('/:comment_id', () => {
        describe('DELETE', () => {
            test('204 - deletes the given comment by comment_id', async () => {
                const { body } = await request(app)
                    .delete(`/api/comments/1`)
                    .expect(204)
    
                expect(body).toEqual({});
    
                const comments = await db.query(
                    `SELECT * FROM comments;`
                );
    
                expect(comments.rows).toHaveLength(5);
            });
            test('400 - bad request: invalid comment_id format', async () => {
                const { body } = await request(app)
                    .delete('/api/comments/invalid')
                    .expect(400);
                
                expect(body.msg).toBe('Bad Request');
            });
            test('404 - not found: valid but non-existent review_id', async () => {
                const { body } = await request(app)
                    .delete('/api/comments/666')
                    .expect(404);

                expect(body.msg).toBe('Not Found: comment does not exist');
            }); 
        });
        describe('PATCH', () => {
            test('200 - comment votes successfully updated', async () => {
                const { body } = await request(app)
                    .patch('/api/comments/1')
                    .send({ inc_votes: 1 })
                    .expect(200)

                expect(body.comment.votes).toBe(17);
            });
            test('400 - bad request: invalid comment_id format', async () => {
                const { body } = await request(app)
                    .patch('/api/comments/invalid')
                    .expect(400);
                
                expect(body.msg).toBe('Bad Request');
            });
            test('400 - bad request: invalid vote format', async () => {
                const { body } = await request(app)
                    .patch('/api/comments/1')
                    .send({ inc_votes : 'dog' })
                    .expect(400)
                
                expect(body.msg).toBe('Bad Request');
            });
            test('400 - bad request: vote not included', async () => {
                const { body } = await request(app)
                    .patch('/api/comments/1')
                    .send({})
                    .expect(400)
                
                expect(body.msg).toBe('Bad Request');
            });
        });
    });
});

describe('/api/users', () => {
    describe('GET', () => {
        test('200 - responds with all users (username only)', async () => {
            const { body } = await request(app)
                .get('/api/users')
                .expect(200)

            expect(body.users).toHaveLength(4);
            body.users.forEach(user => {
                expect(user).toMatchObject({
                    username: expect.any(String)
                });
            })
        });
    });
    describe('/:username', () => {
        describe('GET', () => {
            test('200 - responds with correct user object', async () => {
                const { body } = await request(app)
                    .get('/api/users/mallionaire')
                    .expect(200)

                expect(body.user).toMatchObject({
                    username: 'mallionaire',
                    avatar_url: 'https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg',
                    name: 'haz'
                });
            });
            test('404 - not found: non-existent review_id', async () => {
                const { body } = await request(app)
                    .get('/api/users/notaperson')
                    .expect(404);

                expect(body.msg).toBe('Not Found: user does not exist');
            });
        });
    });
});