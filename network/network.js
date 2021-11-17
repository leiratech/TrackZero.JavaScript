const axios = require("axios").default;

const baseURL = "https://api.trackzero.io";

const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

module.exports = { api };
