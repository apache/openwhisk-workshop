This exercise will test that you understand how to create OpenWhisk Actions
using the Swift runtime. Complete the following tasks to finish the exercise.

- Create an Action (hello-world-swift) which uses Swift runtime and returns the following message.

```
{
  "message": "Hello World"
}
```

- Create an Action (london-location-swift) that uses the Google Geocoding API 
  to return that latitude and longitude for London in the following format.

```
{
  "lat": 0.00,
  "lng": 0.00
}
```

----------------------------------------------------------------------
## HINTS

You can also use the online Swift Sandbox to test your Swift code without having
to install Xcode on your machine.
https://swiftlang.ng.bluemix.net

Documentation for creating Swift Actions is available here.
https://github.com/openwhisk/openwhisk/blob/master/docs/actions.md#creating-swift-actions

Documentation for the Google Geocoding API is available here:
https://developers.google.com/maps/documentation/geocoding/intro

----------------------------------------------------------------------

 __»__ To verify your work, run: `openwhisk-workshop verify`
