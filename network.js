const fetch = require("node-fetch");

const baseUrl = "https://api.trackzero.io/tracking";

const api = {
  /**
   * @async
   * @param {Event|Entity} body
   * @returns response
   */
  post: async (endpointUrl, body) => {
    try {
      const response = await fetch(`${baseUrl}${endpointUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      let data = null;
      try {
        data = await response.json();
      } catch (error) {
        data = null;
      }

      return new Response(response.status, response.statusText, data);
    } catch (err) {
      return new Response(null, null, null, err);
    }
  },
};

class Response {
  constructor(status, statusText, data, error) {
    if (error) {
      this.error = `error: ${error}`;
    } else {
      this.status = status;
      this.statusText = statusText;
      this.data = data;
      this.error = status >= 400 ? statusText : null;
    }
  }
}

module.exports = { api };
