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
### Creating asynchronous actions

JavaScript functions that run asynchronously may need to return the activation
result after the `main` function has returned. You can accomplish this by
returning a Promise in your action.

1. Save the following content in a file called `asyncAction.js`.

  ```
  function main(args) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve({ done: true });
            }, 20000);
        })
  }
```

Notice that the `main` function returns a Promise, which indicates that the
activation hasn't completed yet, but is expected to in the future.

The `setTimeout()` JavaScript function in this case waits for twenty seconds
before calling the callback function.  This represents the asynchronous code and
goes inside the Promise's callback function.

The Promise's callback takes two arguments, resolve and reject, which are both
functions.  The call to `resolve()` fulfills the Promise and indicates that the
activation has completed normally.

A call to `reject()` can be used to reject the Promise and signal that the
activation has completed abnormally.

2. Run the following commands to create the action and invoke it:

  ```
  $ wsk action create asyncAction asyncAction.js
  ```
  ```
  $ wsk action invoke --blocking --result asyncAction
  ```
  ```
  {
      "done": true
  }
  ```

  Notice that you performed a blocking invocation of an asynchronous action.

3. Fetch the activation log to see how long the activation took to complete:

  ```
  $ wsk activation list --limit 1 asyncAction
  ```
  ```
  activations
  b066ca51e68c4d3382df2d8033265db0             asyncAction
  ```


  ```
  $ wsk activation get b066ca51e68c4d3382df2d8033265db0
  ```
 ```
  {
      "start": 1455881628103,
      "end":   1455881648126,
      ...
  }
  ```

  Comparing the `start` and `end` time stamps in the activation record, you can
  see that this activation took slightly over two seconds to complete.

### Using actions to call an external API

The examples so far have been self-contained JavaScript functions. You can also
create an action that calls an external API.

This example invokes a Yahoo Weather service to get the current conditions at a
specific location. 

1. Save the following content in a file called `weather.js`.
  
  ```
  var request = require('request');
  
  function main(params) {
      var location = 'Vermont';
      var url = 'https://query.yahooapis.com/v1/public/yql?q=select item.condition from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + location + '")&format=json';
  
      return new Promise(function(resolve, reject) {
          request.get(url, function(error, response, body) {
              if (error) {
                  reject(error);
              }
              else {
                  var condition = JSON.parse(body).query.results.channel.item.condition;
                  var text = condition.text;
                  var temperature = condition.temp;
                  var output = 'It is ' + temperature + ' degrees in ' + location + ' and ' + text;
                  resolve({msg: output});
              }
          });
      });
  }
  ```
  
Note that the action in the example uses the JavaScript `request` library to
make an HTTP request to the Yahoo Weather API, and extracts fields from the JSON
result. The [References](./reference.md#javascript-runtime-environments) detail
the Node.js packages that you can use in your actions.
  
This example also shows the need for asynchronous actions. The action returns a
Promise to indicate that the result of this action is not available yet when the
function returns. Instead, the result is available in the `request` callback
after the HTTP call completes, and is passed as an argument to the `resolve()`
function.
  
2. Run the following commands to create the action and invoke it:
  
  ```
  $ wsk action create weather weather.js
  ```
  ```
  $ wsk action invoke --blocking --result weather 
  ```
  ```
  {
      "msg": "It is 28 degrees in Vermont and Cloudy"
  }
  ```
