This exercise will test that you understand how to create OpenWhisk Actions
using the Python runtime. Complete the following tasks to finish the exercise.

- Create an Action (hello-world-python) which uses Python runtime and returns the following message.

```
{
  "message": "Hello World"
}
```

- Create an Action (london-location-python) that uses the Google Geocoding API 
  to return that latitude and longitude for London in the following format...

```
{
  "lat": 0.00,
  "lng": 0.00
}
```

----------------------------------------------------------------------
## HINTS

Make sure your Python files have a top-level function called main.

Documentation for creating Python Actions is available here.
https://github.com/openwhisk/openwhisk/blob/master/docs/actions.md#creating-python-actions

Documentation for the Google Geocoding API is available here:
https://developers.google.com/maps/documentation/geocoding/intro

----------------------------------------------------------------------

 __»__ Need help with the task?  `openwhisk-workshop more`
 __»__ To verify your work, run: `openwhisk-workshop verify`
