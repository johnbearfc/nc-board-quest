const { formatValues } = require('../db/utils/data-manipulation');

describe('formatValues()', () => {
    test('returns an empty array when passed an empty array', () => {
        expect(formatValues([])).toEqual([]);
    });
    test('returns correctly formatted values when passed an array with a single object', () => {
        const testData = [{ 1: 'A', 2: 'B'}]
        expect(formatValues(testData)).toEqual([['A', 'B']]);
    });
    test('returns correctly formatted values when passed an array with a multiple objects', () => {
        const testData = [{ 1: 'A', 2: 'B'}, { 1: 'C', 2: 'D'}]
        expect(formatValues(testData)).toEqual([['A', 'B'], ['C', 'D']]);
    });
});