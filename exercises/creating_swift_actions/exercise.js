const exercise = require('workshopper-exercise')()
const shell = require('shelljs')

exercise.requireSubmission = false

exercise.addVerifyProcessor(function (cb) {
  shell.exec('wsk action get hello-world-swift', {silent: true}, (code, stdout, stderr) => {
    const exists = (code === 0)
    const uses_swift = (stdout.match('"kind": "swift"'))

    const success = exists && !!uses_swift
    if (success) {
      this.emit('pass', 'OpenWhisk Action hello-world-swift exists')
    } else {
      this.emit('fail', 'OpenWhisk Action hello-world-swift does not exist')
    }

    cb(null, success)
  })
})

exercise.addVerifyProcessor(function (cb) {
  shell.exec('wsk action invoke hello-world-swift -b -r', {silent: true}, (code, stdout, stderr) => {
    const success_code = (code === 0)
    const found_message = (stdout.match('"message": "Hello World"'))

    const success = success_code && !!found_message
    if (success) {
      this.emit('pass', 'OpenWhisk Action hello-world-swift returns correct message')
    } else {
      this.emit('fail', 'OpenWhisk Action hello-world-swift does not return correct message')
    }

    cb(null, success)
  })
})

exercise.addVerifyProcessor(function (cb) {
  shell.exec('wsk action get london-location-swift', {silent: true}, (code, stdout, stderr) => {
    const exists = (code === 0)
    const uses_swift = (stdout.match('"kind": "swift"'))

    const success = exists && !!uses_swift
    if (success) {
      this.emit('pass', 'OpenWhisk Action london-location-swift exists')
    } else {
      this.emit('fail', 'OpenWhisk Action london-location-swift does not exist')
    }

    cb(null, success)
  })
})

exercise.addVerifyProcessor(function (cb) {
  shell.exec('wsk action invoke london-location-swift -b -r', {silent: true}, (code, stdout, stderr) => {
    const success_code = (code === 0)
    const lat = (stdout.match('"lat": 51.5073509'))
    const lng = (stdout.match('"lng": -0.1277583'))

    const success = success_code && !!lat && !!lng
    if (success) {
      this.emit('pass', 'OpenWhisk Action london-location-swift returns correct message')
    } else {
      this.emit('fail', 'OpenWhisk Action london-location-swift does not return correct message')
    }

    cb(null, success)
  })
})

module.exports = exercise
