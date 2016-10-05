# Binding Triggers To Actions

A rule associates one trigger with one action, with every firing of the trigger
causing the corresponding action to be invoked with the trigger event as input.

With the appropriate set of rules, it's possible for a single trigger event to
invoke multiple actions, or for an action to be invoked as a response to events
from multiple triggers.

For example, consider a system with the following actions:
- `classifyImage` action that detects the objects in an image and classifies them.
- `thumbnailImage` action that creates a thumbnail version of an image.

Also, suppose that there are two event sources that are firing the following triggers:
- `newTweet` trigger that is fired when a new tweet is posted.
- `imageUpload` trigger that is fired when an image is uploaded to a website.

You can set up rules so that a single trigger event invokes multiple actions,
and have multiple triggers invoke the same action:
- `newTweet -> classifyImage` rule.
- `imageUpload -> classifyImage` rule.
- `imageUpload -> thumbnailImage` rule.

The three rules establish the following behavior: images in both tweets and
uploaded images are classified, uploaded images are classified, and a thumbnail
version is generated. 

## Using Rules

Rules are used to associate a trigger with an action. Each time a trigger event
is fired, the action is invoked with the event parameters.

As an example, create a rule that calls the hello action whenever a location update is posted. 

1. Create a 'hello.js' file with the action code we will use:
  ```
  function main(params) {
     return {payload:  'Hello, ' + params.name + ' from ' + params.place};
  }
  ```

2. Make sure that the trigger and action exist.
  ```
  $ wsk trigger update locationUpdate
  ```
  
  ```
  $ wsk action update hello hello.js
  ```

3. Create the rule. Note that the rule will be enabled upon creation, meaning that it will be immediately available to respond to activations of your trigger. The three parameters are the name of the rule, the trigger, and the action.
  ```
  $ wsk rule create myRule locationUpdate hello
  ```

  At any time, you can choose to disable a rule.
  ```
  $ wsk rule disable myRule
  ```

4. Fire the locationUpdate trigger. Each time that you fire an event, the hello action is called with the event parameters.
  ```
  $ wsk trigger fire locationUpdate --param name "Donald" --param place "Washington, D.C."
  ```
  
  ```
  ok: triggered locationUpdate with id d5583d8e2d754b518a9fe6914e6ffb1e
  ```

5. Verify that the action was invoked by checking the most recent activation.
  ```
  $ wsk activation list --limit 1 hello
  ```
  
  ```
  activations
  9c98a083b924426d8b26b5f41c5ebc0d             hello
  ```
  
  ```
  $ wsk activation result 9c98a083b924426d8b26b5f41c5ebc0d
  ```
  ```
  {
     "payload": "Hello, Donald from Washington, D.C."
  }
  ```

  You see that the hello action received the event payload and returned the expected string.

You can create multiple rules that associate the same trigger with different
actions. The trigger and action that make a rule must be in the same namespace
and cannot belong to a package.  If you want to use an action that belongs to a
package, you can copy the action into your namespace. For example: `wsk action
create echo --copy /whisk.system/utils/echo`.
