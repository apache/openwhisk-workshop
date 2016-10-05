# Understanding Packages

In OpenWhisk, you can use packages to bundle together a set of related actions,
and share them with others.

A package can include *actions* and *feeds*.
- An action is a piece of code that runs on OpenWhisk. For example, the Cloudant
  package includes actions to read and write records to a Cloudant database.
- A feed is used to configure an external event source to fire trigger events.
  For example, the Alarm package includes a feed that can fire a trigger at a
  specified frequency.

Every OpenWhisk entity, including packages, belongs in a *namespace*, and the
fully qualified name of an entity is `/namespaceName[/packageName]/entityName`.
Refer to the [naming guidelines](./reference.md#openwhisk-entities) for more
information.

The following sections describe how to browse packages and use the triggers and
feeds in them. In addition, if you are interested in contributing your own
packages to the catalog, read the sections on creating and sharing packages.

## Browsing packages

Several packages are registered with OpenWhisk. You can get a list of packages
in a namespace, list the entities in a package, and get a description of the
individual entities in a package.

1. Get a list of packages in the `/whisk.system` namespace.

  ```
  $ wsk package list /whisk.system
  ```
  ```
  packages
  /whisk.system/cloudant                                                 shared
  /whisk.system/alarms                                                   shared
  /whisk.system/watson                                                   shared
  /whisk.system/websocket                                                shared
  /whisk.system/weather                                                  shared
  /whisk.system/system                                                   shared
  /whisk.system/utils                                                    shared
  /whisk.system/slack                                                    shared
  /whisk.system/samples                                                  shared
  /whisk.system/github                                                   shared
  /whisk.system/pushnotifications                                        shared
  ```

2. Get a list of entities in the `/whisk.system/cloudant` package.

  ```
  $ wsk package get --summary /whisk.system/cloudant
  ```
  ```
  package /whisk.system/cloudant: Cloudant database service
     (params: BluemixServiceName host username password dbname includeDoc overwrite)
   action /whisk.system/cloudant/read: Read document from database
   action /whisk.system/cloudant/write: Write document to database
   feed   /whisk.system/cloudant/changes: Database change feed
  ```

  This output shows that the Cloudant package provides two actions, `read` and
  `write`, and one trigger feed called `changes`. The `changes` feed causes
  triggers to be fired when documents are added to the specified Cloudant
  database.

  The Cloudant package also defines the parameters `username`, `password`,
  `host`, and `port`. These parameters must be specified for the actions and
  feeds to be meaningful. The parameters allow the actions to operate on a
  specific Cloudant account, for example.

3. Get a description of the `/whisk.system/cloudant/read` action.

  ```
  $ wsk action get --summary /whisk.system/cloudant/read
  ```
  ```
  action /whisk.system/cloudant/read: Read document from database
     (params: dbname includeDoc id)
  ```

  This output shows that the Cloudant `read` action requires three parameters,
  including the database and document ID to retrieve.


## Invoking actions in a package

You can invoke actions in a package, just as with other actions. The next few
steps show how to invoke the `greeting` action in the `/whisk.system/samples`
package with different parameters.

1. Get a description of the `/whisk.system/samples/greeting` action.

  ```
  $ wsk action get --summary /whisk.system/samples/greeting
  ```
  ```
  action /whisk.system/samples/greeting: Print a friendly greeting
     (params: name place)
  ```

  Notice that the `greeting` action takes two parameters: `name` and `place`.

2. Invoke the action without any parameters.

  ```
  $ wsk action invoke --blocking --result /whisk.system/samples/greeting
  ```
  ```
  {
      "payload": "Hello, stranger from somewhere!"
  }
  ```

  The output is a generic message because no parameters were specified.

3. Invoke the action with parameters.

  ```
  $ wsk action invoke --blocking --result /whisk.system/samples/greeting --param name Mork --param place Ork
  ```
  ```
  {
      "payload": "Hello, Mork from Ork!"
  }
  ```

  Notice that the output uses the `name` and `place` parameters that were passed to the action.

## Creating a package

A package is used to organize a set of related actions and feeds.  It also
allows for parameters to be shared across all entities in the package.

To create a custom package with a simple action in it, try the following example:

1. Create a package called "custom".

  ```
  $ wsk package create custom
  ```
  ```
  ok: created package custom
  ```

2. Get a summary of the package.

  ```
  $ wsk package get --summary custom
  ```
  ```
  package /myNamespace/custom
  ```

  Notice that the package is empty.

3. Create a file called `identity.js` that contains the following action code. This action returns all input parameters.

  ```
  function main(args) { return args; }
  ```

4. Create an `identity` action in the `custom` package.

  ```
  $ wsk action create custom/identity identity.js
  ```
  ```
  ok: created action custom/identity
  ```

  Creating an action in a package requires that you prefix the action name with
  a package name. Package nesting is not allowed. A package can contain only
  actions and can't contain another package.

5. Get a summary of the package again.

  ```
  $ wsk package get --summary custom
  ```
  ```
  package /myNamespace/custom
   action /myNamespace/custom/identity
  ```

  You can see the `custom/identity` action in your namespace now.

6. Invoke the action in the package.

  ```
  $ wsk action invoke --blocking --result custom/identity
  ```
  ```
  {}
  ```


You can set default parameters for all the entities in a package. You do this by
setting package-level parameters that are inherited by all actions in the
package. To see how this works, try the following example:

1. Update the `custom` package with two parameters: `city` and `country`.

  ```
  $ wsk package update custom --param city Austin --param country USA
  ```
  ```
  ok: updated package custom
  ```

2. Display the parameters in the package and action, and see how the `identity` action in the package inherits parameters from the package.

  ```
  $ wsk package get custom parameters
  ```
  ```
  ok: got package custom, projecting parameters
  [
      {
          "key": "city",
          "value": "Austin"
      },
      {
          "key": "country",
          "value": "USA"
      }
  ]
  ```

  ```
  $ wsk action get custom/identity parameters
  ```
  ```
  ok: got action custom/identity, projecting parameters
  [
      {
          "key": "city",
          "value": "Austin"
      },
      {
          "key": "country",
          "value": "USA"
      }
  ]
  ```

3. Invoke the identity action without any parameters to verify that the action indeed inherits the parameters.

  ```
  $ wsk action invoke --blocking --result custom/identity
  ```
  ```
  {
      "city": "Austin",
      "country": "USA"
  }
  ```

4. Invoke the identity action with some parameters. Invocation parameters are merged with the package parameters; the invocation parameters override the package parameters.

  ```
  $ wsk action invoke --blocking --result custom/identity --param city Dallas --param state Texas
  ```
  ```
  {
      "city": "Dallas",
      "country": "USA",
      "state": "Texas"
  }
  ```


## Sharing a package

After the actions and feeds that comprise a package are debugged and tested, the
package can be shared with all OpenWhisk users. Sharing the package makes it
possible for the users to bind the package, invoke actions in the package, and
author OpenWhisk rules and sequence actions.

1. Share the package with all users:

  ```
  $ wsk package update custom --shared
  ```
  ```
  ok: updated package custom
  ```

2. Display the `publish` property of the package to verify that it is now true.

  ```
  $ wsk package get custom publish
  ```
  ```
  ok: got package custom, projecting publish
  true
  ```


Others can now use your `custom` package, including binding to the package or
directly invoking an action in it. Other users must know the fully qualified
names of the package to bind it or invoke actions in it. Actions and feeds
within a shared package are _public_. If the package is private, then all of its
contents are also private.

1. Get a description of the package to show the fully qualified names of the package and action.

  ```
  $ wsk package get --summary custom
  ```
  ```
  package /myNamespace/custom
   action /myNamespace/custom/identity
  ```

  In the previous example, you're working with the `myNamespace` namespace, and
  this namespace appears in the fully qualified name.
