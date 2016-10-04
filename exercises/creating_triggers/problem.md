This exercise will test that you understand how to create and manually invoke OpenWhisk Triggers. 
Complete the following tasks to finish the exercise.

- Create a Trigger (sample-trigger) with a default parameter (name=James).
- Manually invoke your trigger with the following parameters.

```
{
  "name": "Donald",
  "location": "New York"
}
```

----------------------------------------------------------------------
## HINTS

This test verification assumes the last activation in the system is the
trigger firing. You can check the activation log with the following command.

```
wsk activation list
```

Read more about triggers here.
https://github.com/openwhisk/openwhisk/blob/master/docs/triggers_rules.md#creating-and-firing-triggers

----------------------------------------------------------------------

 __»__ To verify your work, run: `openwhisk-workshop verify`
