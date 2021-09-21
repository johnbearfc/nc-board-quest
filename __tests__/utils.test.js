const { formatCategories, formatUsers, formatReviews, formatComments } = require('../db/utils/data-manipulation');

describe('formatCategories()', () => {
    test('returns an empty array when passed an empty array', () => {
        expect(formatCategories([])).toEqual([]);
    });
    test('returns correctly formatted values when passed an array with a single object', () => {
        const testData = [{ slug: 'A', description: 'B'}];
        expect(formatCategories(testData)).toEqual([['A', 'B']]);
    });
    test('returns correctly formatted values when passed an array with a multiple objects', () => {
        const testData = [{ slug: 'A', description: 'B'}, { slug: 'C', description: 'D'}];
        expect(formatCategories(testData)).toEqual([['A', 'B'], ['C', 'D']]);
    });
    test('input array is not mutated', () => {
        const testData = [{ slug: 'A', description: 'B'}];
        formatCategories(testData);
        expect(testData).toEqual([{ slug: 'A', description: 'B'}]);
    });
});

describe('formatUsers()', () => {
    test('returns an empty array when passed an empty array', () => {
        expect(formatUsers([])).toEqual([]);
    });
    test('returns correctly formatted values when passed an array with a single object', () => {
        const testData = [{ username: 'A', avatar_url: 'B', name: 'C'}];
        expect(formatUsers(testData)).toEqual([['A', 'B', 'C']]);
    });
    test('returns correctly formatted values when passed an array with a multiple objects', () => {
        const testData = [{ username: 'A', avatar_url: 'B', name: 'C'}, { username: 'D', avatar_url: 'E', name: 'F'}];
        expect(formatUsers(testData)).toEqual([['A', 'B', 'C'], ['D', 'E', 'F']]);
    });
    test('input array is not mutated', () => {
        const testData = [{ username: 'A', avatar_url: 'B', name: 'C'}];
        formatCategories(testData);
        expect(testData).toEqual([{ username: 'A', avatar_url: 'B', name: 'C'}]);
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
        }];
        expect(formatReviews(testData)).toEqual([['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A'], ['B', 'B', 'B', 'B', 'B', 'B', 'B', 'B']]);
    });
    test('input array is not mutated', () => {
        const testData = [{
            title: 'A',
            review_body: 'A',
            designer: 'A',
            review_img_url: 'A',
            votes: 'A',
            category: 'A',
            owner: 'A',
            created_at: 'A'
        }];
        formatCategories(testData);
        expect(testData).toEqual([{
            title: 'A',
            review_body: 'A',
            designer: 'A',
            review_img_url: 'A',
            votes: 'A',
            category: 'A',
            owner: 'A',
            created_at: 'A'
        }]);
    });
});

describe('formatComments()', () => {
    test('returns an empty array when passed an empty array', () => {
        expect(formatComments([])).toEqual([]);
    });
    test('returns correctly formatted values when passed an array with a multiple objects', () => {
        const testData = [{
            body: 'A',
            votes: 'A',
            author: 'A',
            review_id: 'A',
            created_at: 'A',
          },
          {
            body: 'B',
            votes: 'B',
            author: 'B',
            review_id: 'B',
            created_at: 'B',
          }];
        expect(formatComments(testData)).toEqual([['A', 'A', 'A', 'A', 'A'], ['B', 'B', 'B', 'B', 'B']]);
    });
    test('input array is not mutated', () => {
        const testData = [{
            body: 'A',
            votes: 'A',
            author: 'A',
            review_id: 'A',
            created_at: 'A',
          }];
        formatCategories(testData);
        expect(testData).toEqual([{
            body: 'A',
            votes: 'A',
            author: 'A',
            review_id: 'A',
            created_at: 'A',
          }]);
    });
});