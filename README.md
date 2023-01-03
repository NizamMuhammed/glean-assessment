# Technical Task (Software Engineer)

Take as long as you need - as a guideline we would expect it to take up to 60 minutes.

## Introduction

[Glean](https://glean.co/) lets you record audio and take notes in an **Event**. A simplified version of the Event
record is as follows:

<pre>
+-------------------------------+
|             Event             |
+-------------------------------+
| name  | Text                  | 
| notes | A collection of Notes | 
+-------------------------------+
</pre>

A Note contains some `text`, and is associated with a `timestamp` - an offset in milliseconds from the start of 
the recording:

<pre>
+-----------------------------+
|            Note             |
+-----------------------------+
| id        | Unique ID       |
| timestamp | Millis offset   | 
| text      | Text            | 
+-----------------------------+
</pre>

The Event is created in a frontend client, and can be saved to the backend and synced to other clients. This 
brings the possibility of two different clients (e.g. the web application and a mobile app) making divergent 
changes to the same Event and having to resolve the differences.

## Task

Implement code to handle two input Events, one remote and one local, outputting a combined Event. For example,
a function with signature:

```
resolveEvents(remote: Event, local: Event): Event
```

Where:
- **remote**: the Event that was last uploaded to the backend.
- **local**: the copy of the Event with local changes.
- **return:** resolved version of the Event, combining the information from both inputs.

Requirements / assumptions:
- Notes that have the same ID in both Events are considered to be the same Note, and need conflict resolution. Otherwise retain 
Notes from both Events.
- Conflicting text data in both the Event and Note should be combined with a slash (see the example).
- Conflicting timestamps in a Note should be resolved by using the timestamp from the remote version.
- All input data is guaranteed not to be null.
- Write unit tests that cover the logic of your solution.

## Example
The examples below are given in JSON-like syntax, but it's not necessary to implement JSON serialisation/deserialisation.

### Local Event
```
{
  name: 'Name 1',
  notes: [
    { id: 1, timestamp: 3200, text: 'A' },
    { id: 2, timestamp: 5600, text: 'C' }
  ]
}
```
### Remote Event
```
{
  name: 'Name 2',
  notes: [
   { id: 1, timestamp: 2400, text: 'B' }
  ]
}
```
### Resolved Event
```
{
  name: 'Name 1 / Name 2',
  notes: [
   { id: 1, timestamp: 2400, text: 'A / B' },
   { id: 2, timestamp: 5600, text: 'C' }
  ]
}
```

# Solution

## Steps to run the solution

### Scripts to test the solution:

#### `1. npm install`

#### `2. npm start`

#### `3. npm run test`

### Familiarising the UI and to test the solution:

#### `Enter Event Name`

Give the Event name, e.g., Name 1.

#### `Enter the number of notes included in the event`

This creates an array of notes with specific ID, timestamp and text.

#### `Enter the details of notes`

According to the number of notes in the event, enter the details and submit them by pressing the button.

#### `Viewing the Events`

Created events are listed below the form.

#### `Resolving event conflicts`

Create an event with a single note and duplicate ID, already available in the list of Events. 
A new event will be created according to the solution given in the problem statement.
