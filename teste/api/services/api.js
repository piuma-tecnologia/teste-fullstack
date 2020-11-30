const axios = require('axios')

const api = axios.create({
  baseURL: "http://localhost:3000/database",
    // baseURL: "https://api.github.com",
});

module.exports = api;