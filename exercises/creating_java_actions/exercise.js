const exercise = require('workshopper-exercise')()
const shell = require('shelljs')

exercise.requireSubmission = false

exercise.addVerifyProcessor(function (cb) {
  shell.exec('wsk action get hello-world-java', {silent: true}, (code, stdout, stderr) => {
    const exists = (code === 0)
    const uses_java = (stdout.match('"kind": "java"'))

    const success = exists && !!uses_java
    if (success) {
      this.emit('pass', 'OpenWhisk Action hello-world-java exists')
    } else {
      this.emit('fail', 'OpenWhisk Action hello-world-java does not exist')
    }

    cb(null, success)
  })
})

exercise.addVerifyProcessor(function (cb) {
  shell.exec('wsk action invoke hello-world-java -b -r', {silent: true}, (code, stdout, stderr) => {
    const success_code = (code === 0)
    const found_message = (stdout.match('"message": "Hello World"'))

    const success = success_code && !!found_message
    if (success) {
      this.emit('pass', 'OpenWhisk Action hello-world-java returns correct message')
    } else {
      this.emit('fail', 'OpenWhisk Action hello-world-java does not return correct message')
    }

    cb(null, success)
  })
})

exercise.addVerifyProcessor(function (cb) {
  shell.exec('wsk action get london-location-java', {silent: true}, (code, stdout, stderr) => {
    const exists = (code === 0)
    const uses_java = (stdout.match('"kind": "java"'))

    const success = exists && !!uses_java
    if (success) {
      this.emit('pass', 'OpenWhisk Action london-location-java exists')
    } else {
      this.emit('fail', 'OpenWhisk Action london-location-java does not exist')
    }

    cb(null, success)
  })
})

exercise.addVerifyProcessor(function (cb) {
  shell.exec('wsk action invoke london-location-java -b -r', {silent: true}, (code, stdout, stderr) => {
    const success_code = (code === 0)
    const lat = (stdout.match('"lat": 51.5073509'))
    const lng = (stdout.match('"lng": -0.1277583'))

    const success = success_code && !!lat && !!lng
    if (success) {
      this.emit('pass', 'OpenWhisk Action london-location-java returns correct message')
    } else {
      this.emit('fail', 'OpenWhisk Action london-location-java does not return correct message')
    }

    cb(null, success)
  })
})

module.exports = exercise
