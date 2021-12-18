"use strict";
/**
 * @class
 */
class Entity {
  /**
   * @constructor
   * Initializes the Entity object
   * @param {string} type - The type of the Entity you are trying to send.
   * @param {(string|number)} id - The id of the Entity you are trying to upsert.
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
    this.autoGeography = null;
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
      throw "Error [Entity][AddAttribute]: 'attribute' and 'value' are required";
    }
    if (attribute.startsWith("_")) {
      throw "Error [Entity][AddAttribute]: 'attribute' cannot start with '_'";
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
    if (attribute.startsWith("_")) {
      throw "Error [Entity][AddEntityReferencedAttribute]: 'attribute' cannot start with '_'";
    }
    if (this.customAttributes[attribute]) {
      this.customAttributes[attribute].push({
        type: referenceType,
        id: referenceId,
      });
    } else {
      this.customAttributes[attribute] = [
        { type: referenceType, id: referenceId },
      ];
    }
    return this;
  }

  /**
   * Automatically Translates a GeoPoint (Lat, Long) to Country and State and links them as Referenced Entity.
   *
   * @param {number} latitude
   * @param {number} longitude
   * @returns the entity instance
   */
  addAutomaticallyTranslatedGeoPoint(latitude, longitude) {
    if (!latitude || !longitude) {
      throw "Error [Entity][AddAutomaticallyTranslatedGeoPoint]: 'latitude' and 'longitude' are required";
    }
    if (isNaN(latitude) || isNaN(longitude)) {
      throw "Error [Entity][AddAutomaticallyTranslatedGeoPoint]: 'latitude' and 'longitude' should be numbers";
    }
    this.autoGeography = {
      geoPoint: {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      },
    };
    return this;
  }
}

module.exports = {
  Entity,
};
