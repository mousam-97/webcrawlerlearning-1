const { test, expect } = require('@jest/globals');
const { getSum } = require('./sum');

test('sum', () => {
    const input = { a: 10, b: 5 };
    const actual = getSum(input.a, input.b);
    const expected = 15;
    expect(actual).toEqual(expected);
});
