This exercise will show you how to use packages in OpenWhisk.

Packages allow you to share your Actions with other users and invoke other
users' services.  OpenWhisk provides built-in packages for common tasks.

Complete the following tasks to finish the exercise.

- Create a new Package (custom-package).
- Create a new Action (greeting) under this package which takes a parameter
  (name) and returns the greeting shown below.
- Bind a default parameter (name) and value (Donald) to the package
- Publish this package as a public shared package.

```
{
  "message": "Hello ${name}"
}
```

----------------------------------------------------------------------
## HINTS

Want to have a look at the default packages that come built-in with OpenWhisk?

```
wsk package list /whisk.system
```

You can invoke package actions using the fully-qualified action name.

```
wsk action invoke /whisk.system/utils/echo -p ....
```

Read more about using packages here.
https://github.com/openwhisk/openwhisk/blob/master/docs/packages.md

----------------------------------------------------------------------

 __»__ To verify your work, run: `openwhisk-workshop verify`
