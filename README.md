# TrackZero-JS

Powerful, insightful and real-time analytics that helps you take your products and apps to the next level.

For more details, please visit [https://TrackZero.io](https://trackzero.io)

## Installation

```bat
npm install trackzero-js
```

## Setup

### In Your Project

At the initialization of your project create a new singleton instance of the TrackZeroClient and pass in your API Key

```js
import { TrackZeroClient } from "@leiratech/trackzero-js";
let instance = new TrackZeroClient("API-KEY");
```

#### Or

```js
const { TrackZeroClient } = require("@leiratech/trackzero-js");
let instance = new TrackZeroClient("API-KEY");
```

## Usage

### The screen you want to track

```js
import { Entity, Event } from "@leiratech/trackzero-js";
```

#### Or

```js
const { Entity, Event } = require("@leiratech/trackzero-js");
```

### Sending Entities

```js
/* Prepare your entity (User object), if we already have an entity of
Type "User" and Id 1, this will update the information stored in
TrackZero with the ones we set here.*/

let user = Entity("User", 1)
  /* Adding attributes (Properties) to send to TrackZero and make it
reportable.*/
  .addAttribute("Name", "Jane Doe")
  .addAttribute("Date Of Birth", new Date().toISOString())
  // Adding Reference Attributes that will link to other entities.
  /* Since the Entity of Type "Country" and Id "US" doesn't exist in our
project, it will be created automatically. We will add more attributes
to it later.*/
  .addEntityReferencedAttribute("Location", "Country", "US");

// Send the Entity to TrackZero
await instance.upsertEntity(user);
```

### Sending Events

```js
/* Prepare the event. Every event has a minimum requirement of Name
(Event Name), and Emitter info (The entitiy that triggered the
event).*/
let event = new Event("User", 1, "Subscribed")
  /* Just like entities, You can add attributes (Properties) to send to
TrackZero and make it reportable.*/
  .addAttribute("Paid Amount", 9.99)
  /* Since the Entity of Type "Marketing Campaign" and Id "Appstore
Direct Marketing" doesn't exist in our project, it will be created
automatically. We will add more attributes to it later.*/
  .addEntityReferencedAttribute(
    "User Source",
    "Marketing Campaign",
    "Appstore Direct Marketing"
  )
  /* Entities that were impacted by this event*/
  .addImpactedTarget("Marketing Campaign", "Appstore Direct Marketing");

// Send the Event to TrackZero
await instance.upsertEvent(event);
```
