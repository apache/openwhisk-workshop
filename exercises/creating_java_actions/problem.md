This exercise will test that you understand how to create OpenWhisk Actions
using the Java runtime. Complete the following tasks to finish the exercise.

- Create an Action (hello-world-java) which uses Java runtime and returns the following message.

```
{
  "message": "Hello World"
}
```

- Create an Action (london-location-java) that uses the Google Geocoding API 
  to return that latitude and longitude for London in the following format...

```
{
  "lat": 0.00,
  "lng": 0.00
}
```

----------------------------------------------------------------------
## HINTS

Documentation for creating Java Actions is available here.
https://github.com/openwhisk/openwhisk/blob/master/docs/actions.md#creating-java-actions

The Google GSON library must exist in your Java CLASSPATH when compiling the Java file.
https://github.com/google/gson

Once you have compiled your Java source to a class file, it needs adding to a
JAR file for deployment using the command-line utility.

Documentation for the Google Geocoding API is available here:
https://developers.google.com/maps/documentation/geocoding/intro

----------------------------------------------------------------------

 __»__ To verify your work, run: `openwhisk-workshop verify`
