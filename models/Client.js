"use strict";
const { logApi, spaceApi } = require("../network/endpoints");
const { Entity } = require("../models/Entity");

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
   * Creates/Updates the Entity
   *
   * @async
   * @param {Entity} entity
   * @returns the response status
   */
  async upsertEntity(entity) {
    if (!(entity instanceof Entity)) {
      throw "Error [TrackZeroClient][upsertEntity]: parameter should be of type Entity";
    }
    let body = {
      type: entity.type,
      id: entity.id,
      customAttributes: entity.customAttributes,
    };

    return await logApi.upsertEntity(this.apiKey, body);
  }

  /**
   * Deletes the Entity
   *
   * @async
   * @param {string} type - type of entity to be deleted
   * @param {(string|number)} id - id of the entity to be deleted
   * @returns the response status
   */
  async deleteEntity(type, id) {
    if (!type || !id) {
      throw "Error [TrackZeroClient][deleteEntity]: 'type' and 'id' are required";
    }

    let body = { type, id };

    return await logApi.deleteEntity(this.apiKey, body);
  }

  /**
   *
   * @param {number} analyticsSpaceId - the analytics space id
   * @param {number} [ttl=3600] - (in seconds) time to live, when the session expires
   * @returns the response status
   */
  async getSession(analyticsSpaceId, ttl = 3600) {
    if (!analyticsSpaceId)
      throw "Error [TrackZeroClient][getSession]: 'analyticsSpaceId' is required";
    if (isNaN(analyticsSpaceId))
      throw "Error [TrackZeroClient][getSession]: 'analyticsSpaceId' should be a number";
    if (isNaN(ttl))
      throw "Error [TrackZeroClient][getSession]: 'ttl' should be a number";

    return await spaceApi.getSession(this.apiKey, analyticsSpaceId, ttl);
  }
}

module.exports = { TrackZeroClient, Entity };
