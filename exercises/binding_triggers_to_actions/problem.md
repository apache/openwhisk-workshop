This exercise will test connecting Triggers to Actions using Rules in OpenWhisk.
Binding Triggers using Rules allows OpenWhisk to automatically fire your Actions
when external events occur.

Complete the following tasks to finish the exercise.

- Create a Trigger (rule-trigger) with the following default parameters.

```
{
  "message:"Trigger fired"
}
```

- Create a Rule (first-trigger-rule) binding this trigger to a new Action (first-trigger-action)
- Create another Rule (second-trigger-rule) binding the same trigger to a different Action (second-trigger-action)

----------------------------------------------------------------------
## HINTS

This verification test fires the trigger and checks the activation logs. You
can check the activation logs with the following command.

```
wsk activation list
```

Use the following command to review the details of an activation.

```
wsk activation get id 
```

Read more about creating and using rule here.
https://github.com/openwhisk/openwhisk/blob/master/docs/triggers_rules.md

----------------------------------------------------------------------

 __»__ To verify your work, run: `openwhisk-workshop verify`
