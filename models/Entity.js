"use strict";
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

module.exports = {
  Entity,
};