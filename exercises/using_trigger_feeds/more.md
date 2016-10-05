# Using Trigger Feeds

Feeds offer a convenient way to configure an external event source to fire these
events to a OpenWhisk trigger. This example shows how to use a feed in the
Alarms package to fire a trigger every second, and how to use a rule to invoke
an action every second.

1. Get a description of the feed in the `/whisk.system/alarms` package.

  ```
  $ wsk package get --summary /whisk.system/alarms
  ```
  ```
  package /whisk.system/alarms
   feed   /whisk.system/alarms/alarm
  ```

  ```
  $ wsk action get --summary /whisk.system/alarms/alarm
  ```
  ```
  action /whisk.system/alarms/alarm: Fire trigger when alarm occurs
     (params: cron trigger_payload)
  ```

  The `/whisk.system/alarms/alarm` feed takes two parameters:
  - `cron`: A crontab specification of when to fire the trigger.
  - `trigger_payload`: The payload parameter value to set in each trigger event.

2. Create a trigger that fires every eight seconds.

  ```
  $ wsk trigger create everyEightSeconds --feed /whisk.system/alarms/alarm -p cron '*/8 * * * * *' -p trigger_payload '{"name":"Mork", "place":"Ork"}'
  ```
  ```
  ok: created trigger feed everyEightSeconds
  ```

3. Create a 'hello.js' file with the following action code.

  ```
  function main(params) {
      return {payload:  'Hello, ' + params.name + ' from ' + params.place};
  }
  ```

4. Make sure that the action exists.

  ```
  $ wsk action update hello hello.js
  ```

5. Create a rule that invokes the `hello` action every time the `everyEightSeconds` trigger fires.

  ```
  $ wsk rule create --enable myRule everyEightSeconds hello
  ```
  ```
  ok: created rule myRule
  ok: rule myRule is activating
  ```

6. Check that the action is being invoked by polling for activation logs.

  ```
  $ wsk activation poll
  ```

  You should see activations every eight seconds for the trigger, the rule, and the action. The action receives the parameters `{"name":"Mork", "place":"Ork"}` on every invocation.
