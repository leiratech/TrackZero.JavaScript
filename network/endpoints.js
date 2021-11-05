const { api } = require("./network");

const log = "/log";
const spaces = "/AnalyticsSpaces";

const logApi = {
  upsertEntity: async function (apiKey, body) {
    return await api.post(`${log}/entities?X-API-KEY=${apiKey}`, body);
  },
  deleteEntity: async function (apiKey, body) {
    return await api.delete(`${log}/entities?X-API-KEY=${apiKey}`, body);
  },
  upsertEvent: async function (apiKey, body) {
    return await api.post(`${log}/events?X-API-KEY=${apiKey}`, body);
  },
  deleteEvent: async function (apiKey, body) {
    return await api.delete(`${log}/events?X-API-KEY=${apiKey}`, body);
  },
};

const spaceApi = {
  getSession: async function (apiKey, analyticsSpaceId, ttl) {
    return await api.get(
      `${spaces}/session?analyticsSpaceId=${analyticsSpaceId}&ttl=${ttl}`,
      {
        "X-API-KEY": apiKey,
      }
    );
  },
};

module.exports = { logApi, spaceApi };
