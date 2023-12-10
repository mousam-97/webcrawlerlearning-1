const { JSDOM } = require('jsdom');

function getURLsFromHTML(htmlBody, baseURL) {
    const urls = [];
    const dom = new JSDOM(htmlBody);
    const links = dom.window.document.querySelectorAll('a');
    for (const link of links) {
        if (link.href.slice(0, 1) === '/') {
            // relative
            urls.push(`${baseURL}${link.href}`);
        }
        else {
            // absolute
            urls.push(link.href);
        }
    }
    return urls;
}

function normalizeURL(inputUrl) {
    const urlObj = new URL(inputUrl);
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`;

    if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1);
    }
    return hostPath;
}

module.exports = { normalizeURL, getURLsFromHTML };