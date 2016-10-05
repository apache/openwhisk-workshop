# OpenWhisk Workshop

🎉 Welcome to the OpenWhisk workshop! 🎉

> *OpenWhisk is a cloud-first distributed event-based programming service. It provides a programming model to upload event handlers to a cloud service, and register the handlers to respond to various events. Learn more at https://developer.ibm.com/openwhisk or try it on IBM Bluemix OpenWhisk.*

This workshop provides a series of [exercises](https://github.ibm.com/thomas6/openwhisk_workshop/tree/master/exercises) to help you understand how to use [OpenWhisk](https://github.com/openwhisk/openwhisk) to build [serverless applications](http://martinfowler.com/articles/serverless.html).


Developers are introduced to each feature of the platform through these exercises. After reading the exercise documentation, they are presented with a challenge to test their skills. The tool automatically verifies whether they have passed that test and records their progress.

![overview](https://dl.dropboxusercontent.com/u/10404736/ow_workshop.png)


## usage 

```
$ git clone https://github.ibm.com/thomas6/openwhisk_workshop.git
$ cd openwhisk_workshop
$ npm install 
$ node openwhisk_workshop.js
```

If this was published externally, the developer would just have to run...

```
$ npm install -g openwhisk_workshop 
$ openwhisk_workshop
```

## exercises

Exercises are located in the [exercises]() folder. The `more.md` file contains the documentation for the feature being introduced. The `problem.md` file contains the test for this exercise. Using the utility, this task will be printed to the console. 

![exercise](https://dl.dropboxusercontent.com/u/10404736/challenge.png)


When the developer has completed the task, they can verify their solution works using the following command.

```
openwhisk-workshop verify
```

![verify](https://dl.dropboxusercontent.com/u/10404736/verify.png)

The following command will display the exercise documentation in the console.

```
openwhisk-workshop more
```

## credits

This workshop tool uses the [NodeSchool](http://nodeschool.io/) project.
