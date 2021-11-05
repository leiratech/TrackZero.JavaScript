const fetch = require("node-fetch");

const baseUrl = "https://api.trackzero.io";

const request = async function (endpointUrl, body, method, headers = {}) {
  let config;
  if (method === "GET") {
    config = {};
  } else {
    config = { body: JSON.stringify(body) };
  }
  try {
    const response = await fetch(`${baseUrl}${endpointUrl}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      ...config,
    });

    let data = null;
    try {
      data = await response.json();
    } catch (error) {
      data = null;
    }

    return new Response(response.status, data);
  } catch (err) {
    return new Response(null, null, err);
  }
};

const api = {
  /**
   * @async
   * @param {Event|Entity} body
   * @returns response
   */
  get: async function (endpointUrl, headers) {
    return await request(endpointUrl, {}, "GET", headers);
  },
  post: async function (endpointUrl, body) {
    return await request(endpointUrl, body, "POST");
  },
  delete: async function (endpointUrl, body) {
    return await request(endpointUrl, body, "DELETE");
  },
};

class Response {
  constructor(status, data, error) {
    if (error) {
      this.error = `error: ${error}`;
    } else {
      this.status = status;
      this.data = data;
      this.error =
        status >= 400
          ? `Check status ${status} on https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#client_error_responses`
          : null;
    }
  }
}

module.exports = { api };