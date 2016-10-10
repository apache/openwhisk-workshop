# Setting Up The CLI

Once you have registered with IBM Bluemix, you need to set up the CLI locally to 
interact with the platform. 

This utility will allow you to create new serverless functions, setting up event
processing, hook up external services and monitor your serverless functions.

## Installing the CLI 

Follow this link on the IBM Bluemix site to download the OpenWhisk CLI to your
local computer. 

Make sure you copy this binary to a location that makes it available in your
executable shell path. When the utility to installed, type the following
command and you should see the help text.

```
$ wsk

        ____      ___                   _    _ _     _     _
       /\   \    / _ \ _ __   ___ _ __ | |  | | |__ (_)___| | __
  /\  /__\   \  | | | | '_ \ / _ \ '_ \| |  | | '_ \| / __| |/ /
 /  \____ \  /  | |_| | |_) |  __/ | | | |/\| | | | | \__ \   <
 \   \  /  \/    \___/| .__/ \___|_| |_|__/\__|_| |_|_|___/_|\_\
  \___\/ tm           |_|

Usage:
  wsk [command]

...
```

## Setting CLI properties

There are three properties to configure the CLI with...

- API host (name or IP address) for the OpenWhisk deployment you want to use.
- Authorization key (username and password) which grants you access to the OpenWhisk API.
- Namespace where your OpenWhisk assets are stored.

```
wsk property set [--apihost <openwhisk_baseurl>] --auth <username:password> --namespace <namespace>
```

The [CLI installation instructions available here](https://new-console.ng.bluemix.net/openwhisk/cli) 
on IBM Bluemix has the command-line with your user properties available for you to run locally.

Copy this command and execute it locally to register your CLI with the platform
account details.
