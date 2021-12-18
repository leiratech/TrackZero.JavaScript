"use strict";
const { logApi, spaceApi } = require("../network/endpoints");
const { Entity } = require("../models/Entity");
const { api } = require("../network/network");

/**
 * @class
 */
class TrackZeroClient {
  /**
   * @constructor
   * Initializes the singleton instance with the supplied API key
   *
   * @param {string} apiKey
   * @returns a singleton instance of TrackZeroClient
   */
  constructor(apiKey) {
    if (TrackZeroClient.instance instanceof TrackZeroClient) {
      return TrackZeroClient.instance;
    }

    if (!apiKey) throw "Error [TrackZeroClient][Constructor]: API Key Required";

    this.apiKey = encodeURI(apiKey);
    Object.freeze(this.apiKey);
    Object.freeze(this);

    api.defaults.headers.common["X-API-KEY"] = this.apiKey;

    TrackZeroClient.instance = this;
  }

  /**
   * Gets the singleton instance
   *
   * @static
   * @returns the instance of TrackZeroClient
   */
  static getInstance() {
    if (TrackZeroClient.instance instanceof TrackZeroClient) {
      return TrackZeroClient.instance;
    }
    throw "Error [TrackZeroClient][getInstance]: TrackZeroClient was not instantiated";
  }

  /**
   * Creates a new Analytic Space
   *
   * @async
   * @param {string} analyticsSpaceId - The id of the Analytics Space to create. Notice that this id cannot be changed later.
   * @returns the response status
   */
  async createAnalyticsSpaceAsync(analyticsSpaceId) {
    if (!analyticsSpaceId)
      throw "Error [TrackZeroClient][createAnalyticsSpaceAsync]: 'analyticsSpaceId' was not assigned";

    return await spaceApi.createSpace(analyticsSpaceId);
  }

  /**
   * Deletes an Analytic Space
   *
   * @async
   * @param {string} analyticsSpaceId - The id of the Analytics Space to delete. Notice that operation is permeant and cannot be undone.
   * @returns the response status
   */
  async deleteAnalyticsSpaceAsync(analyticsSpaceId) {
    if (!analyticsSpaceId)
      throw "Error [TrackZeroClient][deleteAnalyticsSpaceAsync]: 'analyticsSpaceId' was not assigned";

    return await spaceApi.deleteSpace(analyticsSpaceId);
  }

  /**
   * Creates/Updates the Entity
   *
   * @async
   * @param {Entity} entity - The entity to be created/updated if the entity already exists.
   * @param {string} analyticsSpaceId - The Analytics Space Id to scope to. The entity will be added to this Analytics Space.
   * @returns the response status
   */
  async upsertEntityAsync(entity, analyticsSpaceId) {
    if (!(entity instanceof Entity)) {
      throw "Error [TrackZeroClient][UpsertEntityAsync]: parameter should be of type Entity";
    }
    if (!analyticsSpaceId)
      throw "Error [TrackZeroClient][UpsertEntityAsync]: 'analyticsSpaceId' was not assigned";
    let body = {
      type: entity.type,
      id: entity.id,
      customAttributes: entity.customAttributes,
      autoGeography: entity.autoGeography,
    };

    return await logApi.upsertEntity(body, analyticsSpaceId);
  }

  /**
   * Deletes the Entity
   *
   * @async
   * @param {string} type - The type of the Entity to be deleted.
   * @param {(string|number)} id - The id of the Entity to be deleted.
   * @param {string} analyticsSpaceId - The Analytics Space Id to scope to. The entity (if exists) will be deleted from this Analytics Space.
   * @returns the response status
   */
  async deleteEntityAsync(type, id, analyticsSpaceId) {
    if (!type || !id || !analyticsSpaceId) {
      throw "Error [TrackZeroClient][DeleteEntityAsync]: 'type', 'id', and 'analyticsSpaceId' are required";
    }

    let body = { type, id };

    return await logApi.deleteEntity(body, analyticsSpaceId);
  }

  /**
   *
   * @param {string} analyticsSpaceId - The Analytics Space Id to scope to. The session will have limited access to the data in this specific Analytics Space.
   * @param {number} [ttl=3600] - The maximum session duration in seconds. The minimum allowed ttl is 300 seconds and the maximum is 3600 seconds.
   * @returns the response status
   */
  async createAnalyticsSpacePortalSessionAsync(analyticsSpaceId, ttl = 3600) {
    if (!analyticsSpaceId)
      throw "Error [TrackZeroClient][createAnalyticsSpacePortalSessionAsync]: 'analyticsSpaceId' is required";
    if (isNaN(ttl))
      throw "Error [TrackZeroClient][createAnalyticsSpacePortalSessionAsync]: 'ttl' should be a number";
    if (ttl < 300 || ttl > 3600)
      throw "The minimum allowed ttl is 300 seconds and the maximum is 3600 seconds";

    return await spaceApi.getSession(analyticsSpaceId, ttl);
  }
}

module.exports = { TrackZeroClient, Entity };
