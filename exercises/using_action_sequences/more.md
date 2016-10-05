# Using Actions Sequences

You can create an action that chains together a sequence of actions.

Several utility actions are provided in a package called `/whisk.system/utils`
that you can use to create your first sequence. You can learn more about
packages in the [Packages](./packages.md) section.

1. Display the actions in the `/whisk.system/utils` package.
  
  ```
  $ wsk package get --summary /whisk.system/utils
  ```
  ```
  package /whisk.system/utils: Building blocks that format and assemble data
   action /whisk.system/utils/head: Extract prefix of an array
   action /whisk.system/utils/split: Split a string into an array
   action /whisk.system/utils/sort: Sorts an array
   action /whisk.system/utils/echo: Returns the input
   action /whisk.system/utils/date: Current date and time
   action /whisk.system/utils/cat: Concatenates input into a string
  ```
  
  You will be using the `split` and `sort` actions in this example.
  
2. Create an action sequence so that the result of one action is passed as an
   argument to the next action.
  
  ```
  $ wsk action create sequenceAction --sequence /whisk.system/utils/split,/whisk.system/utils/sort
  ```
  
  This action sequence converts some lines of text to an array, and sorts the
  lines.
  
3. Invoke the action:
  
  ```
  $ wsk action invoke --blocking --result sequenceAction --param payload "Over-ripe sushi,\nThe Master\nIs full of regret."
  ```
  ```
  {
      "length": 3,
      "lines": [
          "Is full of regret.",
          "Over-ripe sushi,",
          "The Master"
      ]
  }
  ```

  In the result, you see that the lines are sorted.

**Note**: Parameters passed between actions in the sequence are explicit, except
for default parameters.  Therefore parameters that are passed to the action
sequence are only available to the first action in the sequence.  The result of
the first action in the sequence becomes the input JSON object to the second
action in the sequence (and so on).  This object does not include any of the
parameters originally passed to the sequence unless the first action explicitly
includes them in its result.  Input parameters to an action are merged with the
action's default parameters, with the former taking precedence and overriding
any matching default parameters.  For more information about invoking action
sequences with multiple named parameters, see 
[Setting default parameters](./actions.md#setting-default-parameters).
