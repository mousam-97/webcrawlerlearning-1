const { test, expect } = require('@jest/globals');
const { normalizeURL, getURLsFromHTML } = require('./crawl');

test('normalizeURL strip protocol', () => {
    const input = 'https://blog.boot.dev/path';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
});

test('normalizeURL strip trailing slash', () => {
    const input = 'https://blog.boot.dev/path/';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
});

test('normalizeURL capitals', () => {
    const input = 'https://BLog.boot.dev/path/';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
});

test('normalizeURL strip http', () => {
    const input = 'http://blog.boot.dev/path/';
    const actual = normalizeURL(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
});

test('get urls from html absolute', () => {
    const inputHtmlBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev" >
                Boot dev
            </a>
        </body>
    </html>
    `;
    const inputBaseUrl = 'https://blog.boot.dev';
    const actual = getURLsFromHTML(inputHtmlBody, inputBaseUrl);
    const expected = ['https://blog.boot.dev/'];
    expect(actual).toEqual(expected);
});

test('get urls from html relative', () => {
    const inputHtmlBody = `
    <html>
        <body>
            <a href="/path/" >
                Boot dev
            </a>
        </body>
    </html>
    `;
    const inputBaseUrl = 'https://blog.boot.dev';
    const actual = getURLsFromHTML(inputHtmlBody, inputBaseUrl);
    const expected = ['https://blog.boot.dev/path/'];
    expect(actual).toEqual(expected);
});

test('get urls from html multiple', () => {
    const inputHtmlBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path1/" >
                Boot dev path1
            </a>
            <a href="/path2/" >
                Boot dev path2
            </a>
        </body>
    </html>
    `;
    const inputBaseUrl = 'https://blog.boot.dev';
    const actual = getURLsFromHTML(inputHtmlBody, inputBaseUrl);
    const expected = ['https://blog.boot.dev/path1/', 'https://blog.boot.dev/path2/'];
    expect(actual).toEqual(expected);
});