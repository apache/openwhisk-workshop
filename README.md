# OpenWhisk Workshop

🎉 Welcome to the OpenWhisk workshop! 🎉

> *OpenWhisk is a cloud-first distributed event-based programming service. It provides a programming model to upload event handlers to a cloud service, and register the handlers to respond to various events. Learn more at https://developer.ibm.com/openwhisk or try it on IBM Bluemix OpenWhisk.*

This workshop provides a series of [exercises](https://github.ibm.com/thomas6/openwhisk_workshop/tree/master/exercises) to help you understand how to use [OpenWhisk](https://github.com/openwhisk/openwhisk) to build [serverless applications](http://martinfowler.com/articles/serverless.html).


Developers are introduced to each feature of the platform through these exercises. After reading the exercise documentation, they are presented with a challenge to test their skills. The tool automatically verifies whether they have passed that test and records their progress.

![overview](https://dl.dropboxusercontent.com/u/10404736/ow_workshop.png)


## installation

```
$ npm install -g openwhisk-workshop 
```

_This tool needs the OpenWhisk command-line utility to be installed and authenticated against an instance of the platform. For more details on getting this environment setup, see the following documentation [here](https://new-console.ng.bluemix.net/openwhisk/cli)._


## usage 

Once the tool is installed, developers can open the application by running the following command.

```
$ openwhisk-workshop
```

### challenges

The list of exercises will be displayed, along with current completion progress. Using the arrow keys (<kbd>&uparrow;</kbd><kbd>&downarrow;</kbd>) to navigate the menu, press <kbd>RETURN</kbd> to open an exercise.

On selecting an exercise, the problem challenge will be printed to the terminal. 

![exercise](https://dl.dropboxusercontent.com/u/10404736/challenge.png)

### documentation

Each exercise comes with a documentation page which explains the concepts behind the challenge. Use the following command to display the exercise documentation in the terminal.

```
$ openwhisk-workshop more
```

Developers may need to write sample serverless functions and set up triggers and rules to implement the solutions.

### verification

Once the developer has solved the challenge, they can verify their solution with the following command.

```
$ openwhisk-workshop verify
```

If their solution is correct, that task will be marked as completed and the utility returns to the list of exercises.
Developers can continue working through the exercises until they have completed them all.

![verify](https://dl.dropboxusercontent.com/u/10404736/verify.png)

## exercises

Exercises are located in the [exercises](./exercises/) folder. The `more.md` file contains the documentation for the feature being introduced. The `problem.md` file contains the test for this exercise. The `exercise.js` file contains the JavaScript run to verify the exercise solution.

## support

If you have problems with the workshop, please raise an issue in the repository. 

*Need more general help with OpenWhisk?*

- [Stack Overflow #openwhisk](http://stackoverflow.com/questions/tagged/openwhisk).
- [Slack Group #openwhisk](https://developer.ibm.com/open/slackin/).
- Twitter [@openwhisk](https://twitter.com/openwhisk)

## credits

This workshop tool uses the [NodeSchool](http://nodeschool.io/) project.
