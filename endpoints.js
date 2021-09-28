const { api } = require("./network");

const log = "/log";
const config = "/dynamicconfiguration";

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

const configApi = {
  query: async function (apiKey, groupId, body) {
    return await api.post(
      `${config}/applicable?X-API-KEY=${apiKey}&configurationGroupId=${groupId}`,
      body
    );
  },
};

module.exports = { logApi, configApi };
