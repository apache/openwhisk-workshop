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

## Creating Swift actions

The process of creating Swift actions is similar to that of JavaScript actions.
The following sections guide you through creating and invoking a single swift
action, and adding parameters to that action.

You can also use the online [Swift Sandbox](https://swiftlang.ng.bluemix.net) to
test your Swift code without having to install Xcode on your machine.

### Creating and invoking an action

An action is simply a top-level Swift function. For example, create a file
called `hello.swift` with the following content:

```
func main(args: [String:Any]) -> [String:Any] {
    if let name = args["name"] as? String {
        return [ "greeting" : "Hello \(name)!" ]
    } else {
        return [ "greeting" : "Hello stranger!" ]
    }
}
```

Swift actions always consume a dictionary and produce a dictionary.

You can create a OpenWhisk action called `helloSwift` from this function as
follows:

```
$ wsk action create helloSwift hello.swift
```

When you use the command line and a `.swift` source file, you do not need to
specify that you are creating a Swift action (as opposed to a JavaScript
action); the tool determines that from the file extension.

Action invocation is the same for Swift actions as it is for JavaScript actions:

```
$ wsk action invoke --blocking --result helloSwift --param name World
```

```
  {
      "greeting": "Hello World!"
  }
```

**Attention:** Swift actions run in a Linux environment. Swift on Linux is still
in development, and OpenWhisk usually uses the latest available release, which
is not necessarily stable. In addition, the version of Swift that is used with
OpenWhisk might be inconsistent with versions of Swift from stable releases of
XCode on MacOS.
