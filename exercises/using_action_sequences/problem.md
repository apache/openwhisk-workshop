This exercise will test that you know how to use sequences to combine existing 
Actions to create new Actions. 

This challenges involes creating multiple independent services and joining them
together in a sequence.

Complete the following tasks to finish the exercise.

- Create an Action which takes a string parameter (text) containing a
  sentence. Return an array containing the individual words within the sentence.

```
"Hello my name is James" --> ["Hello", "my", "name", "is", "James"]
```

- Create an Action which takes an array of words and returns an array with those words reversed.


```
["Hello", "my", "name", "is", "James"] --> ["James", "is", "name", "my", "Hello"] 
```

- Create an Action which takes an array of words and returns the string created
by joining the words together into a sentence.


```
["James", "is", "name", "my", "Hello"]  --> "James is name my Hello"
```

- Create a new Action (reverse-sentence-words) using a sequence that joins together these three Actions.
- This new Action should take a parameter (text) and return a sentence (text) which contains the words in the string reversed.

----------------------------------------------------------------------
## HINTS

Learn more about sequences in the documentation.
https://github.com/openwhisk/openwhisk/blob/master/docs/actions.md#creating-action-sequences

OpenWhisk comes with numerous built-in Actions that you might be able to use
rather than creating new Actions.
https://github.com/openwhisk/openwhisk/blob/master/docs/packages.md

You might want to look at the */whisk.system/utils package*.

----------------------------------------------------------------------

 __»__ To verify your work, run: `openwhisk-workshop verify`
