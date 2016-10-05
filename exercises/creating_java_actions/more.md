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

## Creating Java actions

The process of creating Java actions is similar to that of JavaScript and Swift
actions. The following sections guide you through creating and invoking a single
Java action, and adding parameters to that action.

In order to compile, test and archive Java files, you must have a [JDK
8](http://www.oracle.com/technetwork/java/javase/downloads/index.html) installed
locally.

### Creating and invoking an action

A Java action is a Java program with a method called `main` that has the exact
signature as follows:

```
public static com.google.gson.JsonObject main(com.google.gson.JsonObject);
```

For example, create a Java file called `Hello.java` with the following content:

```
import com.google.gson.JsonObject;
public class Hello {
    public static JsonObject main(JsonObject args) {
        String name = "stranger";
        if (args.has("name"))
            name = args.getAsJsonPrimitive("name").getAsString();
        JsonObject response = new JsonObject();
        response.addProperty("greeting", "Hello " + name + "!");
        return response;
    }
}
```

Then, compile `Hello.java` into a JAR file `hello.jar` as follows:
```
$ javac Hello.java
$ jar cvf hello.jar Hello.class
```

**Note:** [google-gson](https://github.com/google/gson) must exist in your Java
CLASSPATH when compiling the Java file.

You can create a OpenWhisk action called `helloJava` from this JAR file as
follows:

```
$ wsk action create helloJava hello.jar
```

When you use the command line and a `.jar` source file, you do not need to
specify that you are creating a Java action; the tool determines that from the
file extension.

Action invocation is the same for Java actions as it is for Swift and JavaScript
actions:

```
$ wsk action invoke --blocking --result helloJava --param name World
```

```
  {
      "greeting": "Hello World!"
  }
```

**Note:** If the JAR file has more than one class with a main method matching
required signature, the CLI tool uses the first one reported by `jar -tf`.
