const localURL = "http://localhost:1337";
const remoteURL = "https://hashtagstrapi-2f857d5493de.herokuapp.com";

/**
 * @description Create URL for Image
 * @param {string} url
 * @returns {string}
 */
const createURL = (url) => `${localURL}${url}`;

/**
 * @description Create API URL for fetches
 * @param {string} url
 * @returns {string}
 */
const createAPI = (url) => createURL(`/api/${url}`);
