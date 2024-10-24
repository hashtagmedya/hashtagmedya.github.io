const localURL = "http://localhost:1337";
const remoteURL = "https://hashtag.luen.world";

/**
 * @description Create URL for Image
 * @param {string} url
 * @returns {string}
 */
const createURL = (url) => `${remoteURL}${url}`;

/**
 * @description Create API URL for fetches
 * @param {string} url
 * @returns {string}
 */
const createAPI = (url) => createURL(`/api/${url}`);
