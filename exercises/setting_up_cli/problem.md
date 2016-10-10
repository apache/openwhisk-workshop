Set up the OpenWhisk command-line utility on your computer. 

- Install the binary from IBM Bluemix and move the binary into your
shell command path. 
- Configure the utiliy with your registered user credentials.

----------------------------------------------------------------------
## HINTS

This [page](https://new-console.ng.bluemix.net/openwhisk/cli) on IBM Bluemix
contains instructions for setting up the OpenWhisk CLI utility.

Once installed and configured, you can test this works with the following
command:

```
$ wsk action invoke /whisk.system/utils/echo -p message hello --blocking --result
{
  "message": "hello"
}
```

----------------------------------------------------------------------

 __»__ Need help with the task?  `openwhisk-workshop more`
 __»__ To verify your work, run: `openwhisk-workshop verify`
