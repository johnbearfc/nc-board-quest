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
            review_body: 'B',
            designer: 'C',
            review_img_url: 'D',
            votes: 'E',
            category: 'F',
            owner: 'G',
            created_at: 'H'
        }, {
            title: 'I',
            review_body: 'J',
            designer: 'K',
            review_img_url: 'L',
            votes: 'M',
            category: 'N',
            owner: 'O',
            created_at: 'P'
        }];
        expect(formatReviews(testData)).toEqual([['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'], ['I', 'J', 'K', 'L', 'M', 'N', 'O', 'P']]);
    });
    test('input array is not mutated', () => {
        const testData = [{
            title: 'A',
            review_body: 'B',
            designer: 'C',
            review_img_url: 'D',
            votes: 'E',
            category: 'F',
            owner: 'G',
            created_at: 'H'
        }];
        formatCategories(testData);
        expect(testData).toEqual([{
            title: 'A',
            review_body: 'B',
            designer: 'C',
            review_img_url: 'D',
            votes: 'E',
            category: 'F',
            owner: 'G',
            created_at: 'H'
        }]);
    });
});

describe('formatComments()', () => {
    test('returns an empty array when passed an empty array', () => {
        expect(formatComments([])).toEqual([]);
    });
    test('returns correctly formatted values when passed an array with a multiple objects', () => {
        const testData = [{
            author: 'A',
            review_id: 'B',
            votes: 'C',
            created_at: 'D',
            body: 'E',
          },
          {
            author: 'F',
            review_id: 'G',
            votes: 'H',
            created_at: 'I',
            body: 'J',
          }];
        expect(formatComments(testData)).toEqual([['A', 'B', 'C', 'D', 'E'], ['F', 'G', 'H', 'I', 'J']]);
    });
    test('input array is not mutated', () => {
        const testData = [{
            body: 'A',
            votes: 'B',
            author: 'C',
            review_id: 'D',
            created_at: 'E',
          }];
        formatCategories(testData);
        expect(testData).toEqual([{
            body: 'A',
            votes: 'B',
            author: 'C',
            review_id: 'D',
            created_at: 'E',
          }]);
    });
});