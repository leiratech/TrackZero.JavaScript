const { api } = require("./network");
/**
 * @class
 */
class TrackZeroClient {
  #apiKey;

  /**
   * @constructor
   * Initializes the singleton instance with the supplied API key
   * @param {string} apiKey
   * @returns an sinngleton instance of TrackZeroClient
   */
  constructor(apiKey) {
    if (TrackZeroClient.instance instanceof TrackZeroClient) {
      return TrackZeroClient.instance;
    }

    if (!apiKey) throw "API Key Required";

    this.#apiKey = apiKey;
    Object.freeze(this.apiKey);
    Object.freeze(this);

    TrackZeroClient.instance = this;
  }

  /**
   *
   * Creates/Updates the Entity
   * @async
   * @param {Entity} entity
   * @returns the response status
   */
  upsertEntity = async (entity) => {
    let body = {
      type: entity.type,
      id: entity.id,
      customAttributes: entity.customAttributes,
    };

    return await api.post(`/entities?X-API-KEY=${this.#apiKey}`, body);
  };

  /**
   *
   * Creates/Updates the Event
   * @async
   * @param {Event} event
   * @returns the response status
   */
  upsertEvent = async (event) => {
    let body = {
      emitter: {
        type: event.emitterType,
        id: event.emitterId,
      },
      name: event.name,
      CustomAttributes: event.customAttributes,
      Targets: event.targets,
    };

    return await api.post(`/events?X-API-KEY=${this.#apiKey}`, body);
  };
}

/**
 * @class
 */
class Entity {
  /**
   * @constructor
   * Initializes the Entity object
   * @param {string} type - Entity's name
   * @param {(string|number)} id - Entity's id
   * @param {Object} [customAttributes = {}] - Object containing an entity's custom attributes
   *
   * @example <caption>Simple Entity Constructor</caption>
   * let entity = new Entity("Name", 1)
   * //To add an attribute to the entity (Method Chainable)
   * .addAttribute("attr1", "value")
   * //To add an attribute that references another entity (Method Chainable)
   * .addEntityReferencedAttribute("relationAttr", "entityName", "entityId")
   *
   * @example
   *<caption>Complex Entity Constructor</caption>
   *
   * ```js
   * let entity = new Entity("Name", 1, {
   *    "attr1" : 123,
   *    "attr2" : "value",
   *    "relationAttr" : {
   *        "type" : "entityName",
   *        "id" : "entityId"
   *    }
   * })
   * ```
   */
  constructor(type, id, customAttributes = {}) {
    this.type = type;
    this.id = id;
    this.customAttributes = customAttributes;
  }

  /**
   *
   * Adds custom attributes to the entity
   * @param {string} attribute - Entity's attribute name
   * @param {*} value - Entity's attribute value
   * @returns the entity instance
   */
  addAttribute = (attribute, value) => {
    this.customAttributes[attribute] = value;
    return this;
  };

  /**
   *
   * Adds custom attributes to the entity that are related to another entity
   * @param {string} attribute - Entity's attribute name
   * @param {string} referenceType - Related to entity name
   * @param {(string|number)} referenceId - Related to entity id
   * @returns the entity instance
   */
  addEntityReferencedAttribute = (attribute, referenceType, referenceId) => {
    this.customAttributes[attribute] = { type: referenceType, id: referenceId };
    return this;
  };
}

/**
 * @class
 */
class Event {
  /**
   * @constructor
   * Initializes the Event object
   * @param {string} emitterType - Type of the entity that emitted the event
   * @param {(string|number)} emitterId - Id of the entity that emitted the event
   * @param {string} name - Event's name
   * @param {Object[]} [targets = []] - Array of entities that were impacted by this event
   * @param {Object} [customAttributes = {}] - Object containing an entity's custom attributes
   *
   * @example <caption>Simple Event Constructor</caption>
   * let event = new Event("emitterEntityName", 1,"eventName")
   * //To add an attribute to the event (Method Chainable)
   * .addAttribute("attr1", "value")
   * //To add an attribute that references another entity (Method Chainable)
   * .addEntityReferencedAttribute("relationAttr", "entityName", "entityId")
   * //To add an entity that was impacted by the event (Method Chainable)
   * .addImpactedTarget("entityName", "entityId")
   * @example
   *<caption>Complex Event Constructor</caption>
   *
   * ```js
   * let event = new Event("emitterEntityName", 1, "eventName",[
   *  {
   *    "type" : "Impacted Entity Name",
   *    "id" : "Impacted Entity Id"
   *  }
   * ], {
   *    "attr1" : 123,
   *    "attr2" : "value",
   *    "relationAttr" : {
   *        "type" : "entityName",
   *        "id" : "entityId"
   *    }
   * })
   * ```
   */
  constructor(
    emitterType,
    emitterId,
    name,
    targets = [],
    customAttributes = {}
  ) {
    this.name = name;
    this.emitterType = emitterType;
    this.emitterId = emitterId;
    this.targets = targets;
    this.customAttributes = customAttributes;
  }

  /**
   *
   * Adds custom attributes to the event
   * @param {string} attribute - Event's attribute name
   * @param {*} value - Event's attribute value
   * @returns the event instance
   */
  addAttribute = (attribute, value) => {
    this.customAttributes[attribute] = value;
    return this;
  };

  /**
   *
   * Adds custom attributes to the event that are related to another entity
   * @param {string} attribute - Event's attribute name
   * @param {string} referenceType - Related to entity name
   * @param {(string|number)} referenceId - Related to entity id
   * @returns the event instance
   */
  addEntityReferencedAttribute = (attribute, referenceType, referenceId) => {
    this.customAttributes[attribute] = { type: referenceType, id: referenceId };
    return this;
  };

  /**
   *
   * Adds entities that were impacted by this event
   * @param {string} impactedType - Entity type that was impacted
   * @param {(string|number)} impactedId - Entity Id that was impacted
   * @returns the event instance
   */
  addImpactedTarget = (impactedType, impactedId) => {
    this.targets.push({ type: impactedType, id: impactedId });
    return this;
  };
}

module.exports = {
  Event,
  Entity,
  TrackZeroClient,
};
