This exercise will test that you understand how to use triggers with external
event feeds. You will need to create multiple trigger feeds that use external
cloud services. Complete the following tasks to finish the exercise.

- Create a Trigger (alarm-trigger) which uses the alarm package as the trigger
  feed to fire every thirty seconds.
- The Trigger should fire with the following payload. 

```
{
  "message:"Alarm fired!"
}
```

----------------------------------------------------------------------
## HINTS

Ensure the trigger has been fired at least once by the alarm feed before running
the verification step. You can check the activation log with the following
command.

```
wsk activation list
```

Read more about trigger feeds here.
https://github.com/openwhisk/openwhisk/blob/master/docs/packages.md#creating-and-using-trigger-feeds

Don't forget to remote the trigger after completing the test!

----------------------------------------------------------------------

 __»__ Need help with the task?  `openwhisk-workshop more`
 __»__ To verify your work, run: `openwhisk-workshop verify`
