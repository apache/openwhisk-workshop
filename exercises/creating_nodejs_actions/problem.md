This exercise will test that you understand how to create OpenWhisk Actions
using the NodeJS runtime. Complete the following tasks to finish the exercise.

- Create an Action (hello-world-nodejs) which uses NodeJS runtime and returns the following message.

```
{
  "message": "Hello World"
}
```

- Create an Action (hello-world-delay-nodejs) that returns the same message 
  after an artificial delay of one second.
- Create an Action (london-location-nodejs) that uses the Google Geocoding API 
  to return that latitude and longitude for London in the following format...

```
{
  "lat": 0.00,
  "lng": 0.00
}
```

----------------------------------------------------------------------
## HINTS

Executing functions after a scheduled delay can be achieved using the 
setTimeout function in NodeJS.
https://nodejs.org/api/timers.html#timers_settimeout_callback_delay_arg

JavaScript supports Promises for returning asychronous results from functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

Documentation for the Google Geocoding API is avaiable here:
https://developers.google.com/maps/documentation/geocoding/intro

OpenWhisk Actions running in the Node.JS environment have access to popular 
NPM modules, the full list is available here: 
https://github.com/openwhisk/openwhisk/blob/master/docs/reference.md#javascript-runtime-environments

This includes the RequestJS module for making HTTP requests.
https://github.com/request/request


----------------------------------------------------------------------

 __»__ Need help with the task?  `openwhisk-workshop more`
 __»__ To verify your work, run: `openwhisk-workshop verify`
