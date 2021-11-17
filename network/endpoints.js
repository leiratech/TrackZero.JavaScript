const { api } = require("./network");

const log = "/log";
const spaces = "/AnalyticsSpaces";

const logApi = {
  upsertEntity: async function (body, analyticsSpaceId) {
    const response = await api
      .post(`${log}/entities?analyticsSpaceId=${analyticsSpaceId}`, body)
      .catch((err) => console.log(`Error: ${err}`));
    return response;
  },
  deleteEntity: async function (body, analyticsSpaceId) {
    const response = await api
      .delete(`${log}/entities?analyticsSpaceId=${analyticsSpaceId}`, {
        data: body,
      })
      .catch((err) => console.log(`Error: ${err}`));
    return response;
  },
};

const spaceApi = {
  createSpace: async function (analyticsSpaceId) {
    const response = await api
      .post(`${spaces}?analyticsSpaceId=${analyticsSpaceId}`)
      .catch((err) => console.log(`Error: ${err}`));
    return response;
  },
  deleteSpace: async function (analyticsSpaceId) {
    const response = await api
      .delete(`${spaces}?analyticsSpaceId=${analyticsSpaceId}`)
      .catch((err) => console.log(`Error: ${err}`));
    return response;
  },
  getSession: async function (analyticsSpaceId, ttl) {
    const response = await api
      .get(`${spaces}/session?analyticsSpaceId=${analyticsSpaceId}&ttl=${ttl}`)
      .catch((err) => console.log(`Error: ${err}`));
    return response;
  },
};

module.exports = { logApi, spaceApi };
