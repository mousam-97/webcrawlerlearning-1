
function normalizeURL(inputUrl) {
    const urlObj = new URL(inputUrl);
    return `${urlObj.hostname}${urlObj.pathname}`;
}

module.exports = { normalizeURL };