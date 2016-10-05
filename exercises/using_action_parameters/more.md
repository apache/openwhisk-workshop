# Using Action Parameters

Parameters can be passed to the action when it is invoked. Each runtime
interface passes these values as an object using the first argument parameter
for the function call.

Using the command-line utility, parameters values can be passed as command-line
arguments when invoking an action.

```
wsk action invoke action_name -p foo bar -p hello world ....
```

## JavaScript Action Parameters

Look at this JavaScript Action which uses the invocation parameters in the
response message.

```
function main(params) {
    var name = params.name || 'stranger'
    return {payload:  'Hello, ' + name + '!'};
}
```

The input parameters are passed as a JSON object parameter to the main function.
Notice how the name and place parameters are retrieved from the params object in
this example.

Using this source code to create and invoke an action, while passing it name and place
parameter values. See the following example:

```
$ wsk action update hello hello.js
$ wsk action invoke --blocking --result hello --param name 'Bernie'
{
    "payload": "Hello Bernie!"
}
```

Notice the use of the --param option to specify a parameter name and value, and
the --result option to display only the invocation result.

## Java Action Parameters 

Here's the same Action re-written using Java. Java Actions are invoked with a
JSON object instance, using the GSON library, containing the parameter values.

```
import com.google.gson.JsonObject;
public class Hello {
    public static JsonObject main(JsonObject args) {
        String name = "stranger";
        if (args.has("name"))
            name = args.getAsJsonPrimitive("name").getAsString();
        JsonObject response = new JsonObject();
        response.addProperty("payload", "Hello " + name + "!");
        return response;
    }
}
```

## Python Action Parameters 

Here's the same Action re-written using Python. Python Actions are invoked with a
dictonary instance containing the parameter values.

```
def main(dict):
    name = dict.get("name", "stranger")
    greeting = "Hello " + name + "!"
    return {"greeting": greeting}
```

## Swift Action Parameters 

Here's the same Action re-written using Swift. Swift actions always consume a
dictionary and produce a dictionary.

```
func main(args: [String:Any]) -> [String:Any] {
    if let name = args["name"] as? String {
        return [ "greeting" : "Hello \(name)!" ]
    } else {
        return [ "greeting" : "Hello stranger!" ]
    }
}
```
