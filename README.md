[![#](https://img.shields.io/npm/v/@leiratech/trackzero-js)](https://www.npmjs.com/package/@leiratech/trackzero-js) [![#](https://img.shields.io/nuget/v/Leira.TrackZero.NetCore.svg)](https://www.nuget.org/packages/Leira.TrackZero.NetCore)

![#](https://img.shields.io/npm/l/@leiratech/trackzero-js)

<h1 align="center">
  <img alt="logo" src="./logo.svg" width="100"/>
  <br/>
  TrackZero-JS
</h1>
Powerful, insightful and real-time analytics that helps you take your products and apps to the next level.

For more details, please visit [https://TrackZero.io](https://trackzero.io)

# Installation

```bat
npm install @leiratech/trackzero-js
```

# Setup

### Import

> Note: You can use either use `import` or `require`, both work fine

```js
import { TrackZeroClient } from "@leiratech/trackzero-js";
```

### Initialization

Initialize the TrackZeroClient instance by passing in your API key before using any of the methods.

```js
let instance = new TrackZeroClient("API-KEY");
```

# Getting Started

### TrackZero Instance

After initializing the TrackZero instance, you could get the instance anywhere in your project

```js
let instance = TrackZeroClient.getInstance();
```

## Entity

Entities are objects that contain data. It can represent any object in the real world. Each entity is defined by it’s Type and Id.

```js
import { Entity } from "@leiratech/trackzero-js";
```

#### Create an Entity object

```js
/**
 * @constructor
 * Initializes the Entity object
 * @param {string} type - states what the entity identifies as
 * @param {(string|number)} id - unique id associated with the entity
 */
let entity = new Entity("type", "id");
```

#### Add Attributes

```js
/**
 * Adds custom attributes to the entity
 * @param {string} attribute - property name
 * @param {*} value - property value
 * @returns the entity instance
 */
entity.addAttribute("attribute", "value");
```

#### Add Attributes Referencing Other Entities

```js
/**
 * Adds custom attributes to the entity that are related to another entity
 * @param {string} attribute - property name
 * @param {string} referenceType - the entity type it is referencing
 * @param {(string|number)} referenceId - the entity id it is referencing
 * @returns the entity instance
 */
entity.addEntityReferencedAttribute(
  "attribute",
  "referenceType",
  "referenceId"
);
```

#### Track Entity

```js
/**
 * Creates/Updates the Entity
 * @async
 * @param {Entity} entity
 * @returns the response status
 */
await instance.upsertEntity(entity);
```

> **Note:** Upsert _(Update/Insert)_ is applied when sending the entity. So, if the the entity of type X with id Y already exists, then it gets updated, else a new entity is created. This also applies to the entity's referenced attributes in `addEntityReferencedAttribute`.

#### Complete Entity Example

```js
let user = new Entity("User", "USER_ID")
  .addAttribute("Name", "Sam Smith")
  .addAttribute("Date Of Birth", new Date(Date.UTC(1990, 11, 23))) //Make sure dates are in UTC
  .addEntityReferencedAttribute("Location", "Country", "US");

await instance.upsertEntity(user);
```

## Event

Events are considered as actions that are emitted from an entity and impact another entity

```js
import { Event } from "@leiratech/trackzero-js";
```

#### Create an Event object

```js
/**
 * @constructor
 * Initializes the Event object
 * @param {string} emitterType - the entity type that emitted the event
 * @param {(string|number)} emitterId - the entity id that emitted the event
 * @param {string} name - the event name
 */
let event = new Event("emitterType", "emitterId", "name");
```

#### Add Attributes

```js
/**
 * Adds custom attributes to the event
 * @param {string} attribute - property name
 * @param {*} value - property value
 * @returns the event instance
 */
event.addAttribute("attribute", "value");
```

#### Add Attributes Referencing Other Entities

```js
/**
 * Adds custom attributes to the event that are related to another entity
 * @param {string} attribute - property name
 * @param {string} referenceType - the entity type it is referencing
 * @param {(string|number)} referenceId - the entity id it is referencing
 * @returns the event instance
 */
event.addEntityReferencedAttribute("attribute", "referenceType", "referenceId");
```

#### Add Impacted Entities

```js
/**
 * Adds entities that were impacted by this event
 * @param {string} impactedType - the entity type that was impacted by the event
 * @param {(string|number)} impactedId - the entity id that was impacted by the event
 * @returns the event instance
 */
event.addImpactedTarget("impactedType", "impactedId");
```

#### Track Event

```js
/**
 * Creates/Updates the Event
 * @async
 * @param {Event} event
 * @returns the response status
 */
await instance.upsertEvent(event);
```

> **Note:** Like the Entity object, upsert _(Update/Insert)_ is applied to the event's emitter, entity's referenced attributes in `addEntityReferencedAttribute`, and the impacted entities in `addImpactedTarget`.

#### Complete Event Example

```js
let checked = new Event("User", "USER_ID", "Checked Out")
  .addAttribute("Cart Total", 99.95)
  .addEntityReferencedAttribute("Item", "Product", "SKU-1234")
  .addImpactedTarget("Warehouse", "WH-BLVD-652");

// Send the Event to TrackZero
await instance.upsertEvent(checked);
```

# Resources

[Changelog](./CHANGELOG.md#change-log)

# License

[MIT](https://github.com/leiratech/TrackZero.JavaScript/blob/main/LICENSE)
