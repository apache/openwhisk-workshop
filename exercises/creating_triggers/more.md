# Creating Triggers

Triggers are a named channel for a class of events. The following are examples of triggers:
- A trigger of location update events.
- A trigger of document uploads to a website.
- A trigger of incoming emails.

Triggers can be *fired* (activated) by using a dictionary of key-value pairs.
Sometimes this dictionary is referred to as the *event*. As with actions, each
firing of a trigger results in an activation ID.

Triggers can be explicitly fired by a user or fired on behalf of a user by an
external event source.  A *feed* is a convenient way to configure an external
event source to fire trigger events that can be consumed by OpenWhisk. Examples
of feeds include the following:
- Cloudant data change feed that fires a trigger event each time a document in a
  database is added or modified.
- A Git feed that fires a trigger event for every commit to a Git repository.

## Creating and firing triggers

Triggers can be fired when certain events occur, or can be fired manually.

As an example, create a trigger to send user location updates, and manually fire
the trigger.

1. Enter the following command to create the trigger:
 
  ```
  $ wsk trigger create locationUpdate
  ```
 
  ```
  ok: created trigger locationUpdate
  ```

2. Check that you created the trigger by listing the set of triggers.

  ```
  $ wsk trigger list
  ```
 
  ```
  triggers
  /someNamespace/locationUpdate                            private
  ```

  So far you've created a named "channel" to which events can be fired.

3. Next, fire a trigger event by specifying the trigger name and parameters:

  ```
  $ wsk trigger fire locationUpdate --param name "Donald" --param place "Washington, D.C."
  ```

  ```
  ok: triggered locationUpdate with id fa495d1223a2408b999c3e0ca73b2677
  ```

A trigger that is fired without an accompanying rule to match against has no visible effect.
Triggers cannot be created inside a package; they must be created directly under a namespace.
