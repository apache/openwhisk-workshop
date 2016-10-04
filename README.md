# OpenWhisk Workshop

Example workshop using the [NodeSchool](http://nodeschool.io/) project. 

Allows developers to work through a series of examples that the utility can verify they have completed. 

See the [exercises](https://github.ibm.com/thomas6/openwhisk_workshop/tree/master/exercises) for details. 

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

![overview](https://dl.dropboxusercontent.com/u/10404736/ow_workshop.png)

## exercises

Each exercise comes with a README.md file explaining the concept being introduced and then a test to verify they have understood it works. 

![exercise](https://dl.dropboxusercontent.com/u/10404736/challenge.png)

Running the following commands, executes the tests and report to the user whether they have successfully passed that section. 
![verify](https://dl.dropboxusercontent.com/u/10404736/verify.png)
```
$ node openwhisk_workshop.js verify
```

