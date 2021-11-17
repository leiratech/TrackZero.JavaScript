[![#](https://img.shields.io/npm/v/@leiratech/trackzero-js)](https://www.npmjs.com/package/@leiratech/trackzero-js) [![#](https://img.shields.io/nuget/v/Leira.TrackZero.NetCore.svg)](https://www.nuget.org/packages/Leira.TrackZero.NetCore)

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

## Analytics Spaces

The first you need to do before sending data to TrackZero is to create your data container (Analytics Space), please make sure to read the [Concepts & Definitions](https://www.trackzero.io/docs/concepts-definitions/) to fully understand how TrackZero works.

#### Creating Analytics Spaces

```js
await instance.createAnalyticsSpaceAsync("analytics-space-id");
```

#### Deleting Analytics Spaces

```js
await instance.deleteAnalyticsSpaceAsync("analytics-space-id");
```

## Entity

TrackZero uses what is known as Upsert (Update or Insert). Creating an Entity or updating it uses the same operation. This allows undeterministic creation of Entities (Or updating), which means you don’t have to remember the state of an Entity in order to determine whether you need to update or create.

```js
import { Entity } from "@leiratech/trackzero-js";
```

#### Create an Entity object

```js
/**
 * @constructor
 * Initializes the Entity object
 *
 * @param {string} type
 * @param {(string|number)} identity
 */
let entity = new Entity("type", "id");
```

#### Add Attributes

```js
/**
 * Adds custom attributes to the entity
 *
 * @param {string} attribute
 * @param {*} value
 * @returns the entity instance
 */
entity.addAttribute("attribute", "value");
```

#### Add Attributes Referencing Other Entities

```js
/**
 * Adding Reference Attributes that will link to other entities
 *
 * @param {string} attribute
 * @param {string} referenceTypereferencing
 * @param {(string|number)} referenceId
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
 * @param {string} analyticsSpaceId
 * @returns the response status
 */
await instance.upsertEntityAsync(entity, "analytics-space-id");
```

> **Note:** Upsert _(Update/Insert)_ is applied when sending the entity. So, if the the entity of type X with id Y already exists, then it gets updated, else a new entity is created. This also applies to the entity's referenced attributes in `addEntityReferencedAttribute`.

#### Complete Entity Example

```js
let user = new Entity("User", "USER_ID")
  .addAttribute("Name", "Sam Smith")
  .addAttribute("Date Of Birth", new Date(Date.UTC(1990, 11, 23))) //Make sure dates are in UTC
  .addEntityReferencedAttribute("Location", "Country", "US");

await instance.upsertEntityAsync(user, "analytics-space-id");
```

#### Delete Entity

> :exclamation: &nbsp; Deletion is permanent and cannot be undone.

```js
/**
 * Deletes the Entity
 *
 * @async
 * @param {string} type
 * @param {(string|number)} id
 * @param {string} analyticsSpaceId
 * @returns the response status
 */
await instance.deleteEntityAsync("type", "id", "analytics-space-id");
```

## Analytics Spaces

You can easily create the analytics space session. The result from the server will contain one attribute that we are interested in which is the Url. Once you have the Url, send the user to that Url provided by TrackZero and they can start using the platform.

#### Get an Analytics Space Portal Session

```js
/**
 * Creates an analytics portal session
 *
 * @async
 * @param {number} analyticsSpaceId
 * @param {number} ttl
 * @returns the portal session
 */
let session = await instance.createAnalyticsSpacePortalSessionAsync(
  "analytics-space-id",
  3600
);
```

> Sessions automatically expire and get removed. No action is necessary from your side.

# Resources

[Changelog](./CHANGELOG.md#change-log)

# License

[MIT](https://github.com/leiratech/TrackZero.JavaScript/blob/main/LICENSE)
