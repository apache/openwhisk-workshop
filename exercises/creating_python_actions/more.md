# Creating and invoking OpenWhisk actions

Actions are stateless code snippets that run on the OpenWhisk platform. An
action can be a JavaScript function, a Swift function, or a custom executable
program packaged in a Docker container. For example, an action can be used to
detect the faces in an image, aggregate a set of API calls, or post a Tweet.

Actions can be explicitly invoked, or run in response to an event. In either
case, a run of an action results in an activation record that is identified by a
unique activation ID. The input to an action and the result of an action are a
dictionary of key-value pairs, where the key is a string and the value a valid
JSON value.

Actions can be composed of calls to other actions or a defined sequence of
actions.

## Creating Python actions

The process of creating Python actions is similar to that of JavaScript actions.
The following sections guide you through creating and invoking a single Python
action, and adding parameters to that action.

### Creating and invoking an action

An action is simply a top-level Python function, which means it is necessary to
have a method that is named `main`. For example, create a file called `hello.py`
with the following content:

```
def main(dict):
    greeting = "Hello World"
    return {"greeting": greeting}
```

Python actions always consume a dictionary and produce a dictionary.

You can create an OpenWhisk action called `helloPython` from this function as
follows:

```
$ wsk action create helloPython hello.py
```

When you use the command line and a `.py` source file, you do not need to
specify that you are creating a Python action (as opposed to a JavaScript
action); the tool determines that from the file extension.

Action invocation is the same for Python actions as it is for JavaScript
actions:

```
$ wsk action invoke --blocking --result helloPython
```

```
  {
      "greeting": "Hello World"
  }
```
