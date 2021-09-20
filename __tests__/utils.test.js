const { formatCategories, formatUsers, formatReviews } = require('../db/utils/data-manipulation');

describe('formatCategories()', () => {
    test('returns an empty array when passed an empty array', () => {
        expect(formatCategories([])).toEqual([]);
    });
    test('returns correctly formatted values when passed an array with a single object', () => {
        const testData = [{ slug: 'A', description: 'B'}]
        expect(formatCategories(testData)).toEqual([['A', 'B']]);
    });
    test('returns correctly formatted values when passed an array with a multiple objects', () => {
        const testData = [{ slug: 'A', description: 'B'}, { slug: 'C', description: 'D'}]
        expect(formatCategories(testData)).toEqual([['A', 'B'], ['C', 'D']]);
    });
});

describe('formatUsers()', () => {
    test('returns an empty array when passed an empty array', () => {
        expect(formatUsers([])).toEqual([]);
    });
    test('returns correctly formatted values when passed an array with a single object', () => {
        const testData = [{ username: 'A', avatar_url: 'B', name: 'C'}]
        expect(formatUsers(testData)).toEqual([['A', 'B', 'C']]);
    });
    test('returns correctly formatted values when passed an array with a multiple objects', () => {
        const testData = [{ username: 'A', avatar_url: 'B', name: 'C'}, { username: 'D', avatar_url: 'E', name: 'F'}]
        expect(formatUsers(testData)).toEqual([['A', 'B', 'C'], ['D', 'E', 'F']]);
    });
});

describe('formatReviews()', () => {
    test('returns an empty array when passed an empty array', () => {
        expect(formatReviews([])).toEqual([]);
    });
    test('returns correctly formatted values when passed an array with a multiple objects', () => {
        const testData = [{
            title: 'A',
            review_body: 'A',
            designer: 'A',
            review_img_url: 'A',
            votes: 'A',
            category: 'A',
            owner: 'A',
            created_at: 'A'
        }, {
            title: 'B',
            review_body: 'B',
            designer: 'B',
            review_img_url: 'B',
            votes: 'B',
            category: 'B',
            owner: 'B',
            created_at: 'B'
        }]
        expect(formatReviews(testData)).toEqual([['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A'], ['B', 'B', 'B', 'B', 'B', 'B', 'B', 'B']]);
    });
});

