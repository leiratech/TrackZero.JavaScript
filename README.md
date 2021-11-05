[![#](https://img.shields.io/npm/v/@leiratech/trackzero-js)](https://www.npmjs.com/package/@leiratech/trackzero-js) [![#](https://img.shields.io/pub/v/leiratech_trackzero)](https://pub.dev/packages/leiratech_trackzero) [![#](https://img.shields.io/nuget/v/Leira.TrackZero.NetCore.svg)](https://www.nuget.org/packages/Leira.TrackZero.NetCore)

![#](https://img.shields.io/npm/l/@leiratech/trackzero-js)

<p align="center"><img alt="logo" src="./logo.svg" width="100"/></p>
<h1 align="center">
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

> Note: You can either use `import` or `require`, both work fine

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
 *
 * @param {string} type - states what the entity identifies as
 * @param {(string|number)} id - unique id associated with the entity
 */
let entity = new Entity("type", "id");
```

#### Add Attributes

```js
/**
 * Adds custom attributes to the entity
 *
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
 *
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
 *
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

#### Delete Entity

> :exclamation: &nbsp; Deletion is permanent and cannot be undone.

```js
/**
 * Deletes the Entity
 *
 * @async
 * @param {string} type - type of entity to be deleted
 * @param {(string|number)} id - id of the entity to be deleted
 * @returns the response status
 */
await instance.deleteEntity("type", "id");
```

## Analytics Spaces

Each analytics space represents a separate database storing analytical data relevant to a specific subject/entity _user defined_.

Each analytics space is able to build reports and dahsboards in TrackZero's space portal.

#### Get a Space Portal Session

```js
/**
 * Creates a portal session
 *
 * @async
 * @param {number} analyticsSpaceId - the analytics space id
 * @param {number} [ttl=3600] - (in seconds) time to live, when the session expires
 * @returns the response status
 */
await instance.getSession(analyticsSpaceId, ttl);
```

# Resources

[Changelog](./CHANGELOG.md#change-log)

# License

[MIT](https://github.com/leiratech/TrackZero.JavaScript/blob/main/LICENSE)
