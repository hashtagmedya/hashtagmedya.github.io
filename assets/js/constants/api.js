const localURL = "http://localhost:1337";
const remoteURL = "https://hashtagstrapi-2f857d5493de.herokuapp.com";

const createURL = (url) => `${remoteURL}${url}`;
const createAPI = (url) => createURL(`/api/${url}`);
