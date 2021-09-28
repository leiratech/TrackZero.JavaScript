"use strict";
const { logApi, configApi } = require("./endpoints");
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
      throw "Error [Entity][deleteEntity]: 'type' and 'id' are required";
    }

    let body = { type, id };

    return await logApi.deleteEntity(this.apiKey, body);
  }

  /**
   * Creates/Updates the Event
   *
   * @async
   * @param {Event} event
   * @returns the response status
   */
  async upsertEvent(event) {
    if (!(event instanceof Event)) {
      throw "Error [TrackZeroClient][upsertEvent]: parameter should be of type Event";
    }
    let body = {
      id: event.id,
      emitter: {
        type: event.emitterType,
        id: event.emitterId,
      },
      startTime: event.startTime,
      endTime: event.endTime,
      name: event.name,
      CustomAttributes: event.customAttributes,
      Targets: event.targets,
    };

    return await logApi.upsertEvent(this.apiKey, body);
  }

  /**
   * Deletes the Event
   *
   * @async
   * @param {string} type - event type/name to be deleted
   * @param {(string|number)} id - id of the event to be deleted
   *
   * @returns the response status
   */
  async deleteEvent(type, id) {
    if (!type || !id) {
      throw "Error [Entity][deleteEvent]: 'type' and 'id' are required";
    }

    let body = { type, id };

    return await logApi.deleteEvent(this.apiKey, body);
  }

  /**
   * Queries the configuration based on the groupId
   *
   * @async
   * @param {string} groupId - the configuration group Id
   * @param {(string|number)} identifier - the value you want to check the conditions on
   * @returns the response status
   */
  async queryConfiguration(groupId, identifier) {
    if (!groupId) {
      throw "Error [TrackZeroClient][queryConfiguration]: 'groupId' is required";
    }
    let body = { identifier: identifier };

    return await configApi.query(this.apiKey, groupId, body);
  }
}

/**
 * @class
 */
class Entity {
  /**
   * @constructor
   * Initializes the Entity object
   * @param {string} type - Entity's type
   * @param {(string|number)} id - Entity's id
   *
   * @example
   *
   * ```js
   * let entity = new Entity("User", "87717c11-ed5a...")
   *  //Adds an attribute to the entity (Method Chainable)
   *  .addAttribute("Name", "Sam Smith")
   *  //Adds an attribute that references another entity (Method Chainable)
   *  .addEntityReferencedAttribute("Nationality", "Country", "US")
   * ```
   */
  constructor(type, id) {
    if (!type || !id) {
      throw "Error [Entity][Constructor]: 'type' and 'id' are required";
    }
    this.type = type;
    this.id = id;
    this.customAttributes = {};
  }

  /**
   * Adds custom attributes to the entity
   *
   * @param {string} attribute - Entity's attribute name
   * @param {*} value - Entity's attribute value
   * @returns the entity instance
   */
  addAttribute(attribute, value) {
    if (!attribute || !value) {
      throw "Error [Entity][AddAttribute]: 'name' and 'value' are required";
    }
    this.customAttributes[attribute] = value;
    return this;
  }

  /**
   * Adds custom attributes to the entity that are related to another entity
   *
   * @param {string} attribute - Entity's attribute name
   * @param {string} referenceType - Related to entity type
   * @param {(string|number)} referenceId - Related to entity id
   * @returns the entity instance
   */
  addEntityReferencedAttribute(attribute, referenceType, referenceId) {
    if (!attribute || !referenceType || !referenceId) {
      throw "Error [Entity][AddEntityReferencedAttribute]: 'name', 'reference type' and 'reference id' are required";
    }
    this.customAttributes[attribute] = { type: referenceType, id: referenceId };
    return this;
  }
}

/**
 * @class
 */
class Event {
  /**
   * @constructor
   * Initializes the Event object
   *
   * @param {string} emitterType - Type of the entity that emitted the event.
   * @param {(string|number)} emitterId - Id of the entity that emitted the event.
   * @param {string} name - Event's name.
   * @param {(string|number)} [id] - Event's id. Specifying your own Id prevents duplication if it happens and you send this event again. When not specified, it will be automatically set to a NewGuid.
   * @param {string} [startTime] - (ISO 8601) The start time of the event. If not set, it will be automatically set to the current time UTC
   * @param {string} [endTime] - (ISO 8601) The end time of the event. If not set, it will be automatically set to the current time UTC
   *
   * @example
   *
   * ```js
   * let event = new Event("User", "87717c11-ed5a...", "Checked Out")
   *  //To add an attribute to the event (Method Chainable)
   *  .addAttribute("Cart Total", 799.99)
   *  //To add an attribute that references another entity (Method Chainable)
   *  .addEntityReferencedAttribute("Item", "Product", "SKU-1234")
   *  //To add an entity that was impacted by the event (Method Chainable)
   *  .addImpactedTarget("Company", "Store A")
   * ```
   */
  constructor(emitterType, emitterId, name, id, startTime, endTime) {
    if (!emitterType || !emitterId || !name) {
      throw "Error [Event][Constructor]: 'emitter type', 'emitter id' and 'name' are required";
    }
    this.name = name;
    this.emitterType = emitterType;
    this.emitterId = emitterId;
    this.id = id;
    this.startTime = startTime;
    this.endTime = endTime;
    this.targets = [];
    this.customAttributes = {};
  }

  /**
   * Adds custom attributes to the event
   *
   * @param {string} attribute - Event's attribute name
   * @param {*} value - Event's attribute value
   * @returns the event instance
   */
  addAttribute(attribute, value) {
    if (!attribute || !value) {
      throw "Error [Event][AddAttribute]: 'name' and 'value' are required";
    }
    this.customAttributes[attribute] = value;
    return this;
  }

  /**
   * Adds custom attributes to the event that are related to another entity
   *
   * @param {string} attribute - Event's attribute name
   * @param {string} referenceType - Related to entity type
   * @param {(string|number)} referenceId - Related to entity id
   * @returns the event instance
   */
  addEntityReferencedAttribute(attribute, referenceType, referenceId) {
    if (!attribute || !referenceType || !referenceId) {
      throw "Error [Event][AddEntityReferencedAttribute]: 'name', 'reference type' and 'reference id' are required";
    }
    this.customAttributes[attribute] = { type: referenceType, id: referenceId };
    return this;
  }

  /**
   * Adds entities that were impacted by this event
   *
   * @param {string} impactedType - Entity type that was impacted
   * @param {(string|number)} impactedId - Entity Id that was impacted
   * @returns the event instance
   */
  addImpactedTarget(impactedType, impactedId) {
    if (!impactedType || !impactedId) {
      throw "Error [Event][AddImpactedTarget]: 'type' and 'id' are required";
    }
    this.targets.push({ type: impactedType, id: impactedId });
    return this;
  }
}

module.exports = {
  Event,
  Entity,
  TrackZeroClient,
};
