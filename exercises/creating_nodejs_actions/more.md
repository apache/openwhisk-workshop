# Creating and invoking OpenWhisk actions

Actions are stateless code snippets that run on the OpenWhisk platform. An
action can be a JavaScript function, a Swift function, or a custom executable
program packaged in a Docker container. For example, an action can be used to
detect the faces in an image, aggregate a set of API calls, or post a Tweet.

Actions can be explicitly invoked, or run in response to an event. In either
case, a run of an action results in an activation record that is identified by a
unique activation ID. The input to an action and the result of an action are a
dictionary of key-value pairs, where the key is a string and the value a valid
JSON value.

Actions can be composed of calls to other actions or a defined sequence of
actions.

## Creating and invoking JavaScript actions

The following sections guide you through working with actions in JavaScript. You
begin with the creation and invocation of a simple action. Then, you move on to
adding parameters to an action and invoking that action with parameters. Next is
setting default parameters and invoking them. Then, you create asynchronous
actions and, finally, work with action sequences.

### Creating and invoking a simple JavaScript action

Review the following steps and examples to create your first JavaScript action.

1. Create a JavaScript file with the following content. For this example, the
   file name is 'hello.js'.
  
  ```
  function main() {
      return {payload: 'Hello world'};
  }
  ```

  The JavaScript file might contain additional functions. However, by
  convention, a function called `main` must exist to provide the entry point for
  the action.

2. Create an action from the following JavaScript function. For this example,
   the action is called 'hello'.

  ```
  $ wsk action create hello hello.js
  ```
  ```
  ok: created action hello
  ```

3. List the actions that you have created:
  
  ```
  $ wsk action list
  ```
  ```
  actions
  hello       private
  ```

  You can see the `hello` action you just created.

4. After you create your action, you can invoke it in the cloud in OpenWhisk
   with the 'invoke' command. You can run actions with a *blocking* invocation
   (i.e., request/response style) or a *non-blocking* invocation by specifying a
   flag in the command. A blocking invocation request will _wait_ for the
   activation result to be available. The wait period is the lesser of 60
   seconds or the action's configured [time limit](./reference.md#per-action-timeout-ms-default-60s).
   The result of the activation is returned if it is available within the wait
   period. Otherwise, the activation continues processing in the system and an
   activation ID is returned so that one may check for the result later, as with
   non-blocking requests (see [here](#watching-action-output) for tips on
   monitoring activations).

  This example uses the blocking parameter, `--blocking`:

  ```
  $ wsk action invoke --blocking hello
  ```
  ```
  ok: invoked hello with id 44794bd6aab74415b4e42a308d880e5b
  {
      "result": {
          "payload": "Hello world"
      },
      "status": "success",
      "success": true
  }
  ```

  The command outputs two important pieces of information:
  * The activation ID (`44794bd6aab74415b4e42a308d880e5b`)
  * The invocation result if it is available within the expected wait period

  The result in this case is the string `Hello world` returned by the JavaScript
  function. The activation ID can be used to retrieve the logs or result of the
  invocation at a future time.  

5. If you don't need the action result right away, you can omit the `--blocking`
   flag to make a non-blocking invocation. You can get the result later by using
   the activation ID. See the following example:

  ```
  $ wsk action invoke hello
  ```
  ```
  ok: invoked hello with id 6bf1f670ee614a7eb5af3c9fde813043
  ```

  ```
  $ wsk activation result 6bf1f670ee614a7eb5af3c9fde813043
  ```
  ```
  {
      "payload": "Hello world"
  }
  ```

6. If you forget to record the activation ID, you can get a list of activations
   ordered from the most recent to the oldest. Run the following command to get
   a list of your activations:

  ```
  $ wsk activation list
  ```
  ```
  activations
  44794bd6aab74415b4e42a308d880e5b         hello
  6bf1f670ee614a7eb5af3c9fde813043         hello
  ```
