This exercise will test that you understand how to use parameters with OpenWhisk
Actions. Complete the following tasks to finish the exercise.

- Create an Action (greeting-with-parameter) which takes a parameter (name) and returns the following message which contains the parameter value.
- This Action should bind a default Action parameter value (Bob).

```
{
  "message": "Hello ${name}"
}
```

*Finding this a bit easy? Try to re-implement the task in a number of
languages...*

----------------------------------------------------------------------
## HINTS

Request parameters are passed as an object through the first function parameter
for the runtime interface. Here's an example of using this with the NodeJS
runtime
https://github.com/openwhisk/openwhisk/blob/master/docs/actions.md#passing-parameters-to-an-action.

Default parameters for Actions can bound using the wsk command-line utility
https://github.com/openwhisk/openwhisk/blob/master/docs/actions.md#setting-default-parameters

----------------------------------------------------------------------

 __»__ Need help with the task?  `openwhisk-workshop more`
 __»__ To verify your work, run: `openwhisk-workshop verify`
