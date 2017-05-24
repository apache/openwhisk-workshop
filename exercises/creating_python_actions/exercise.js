const exercise = require('workshopper-exercise')()
const shell = require('shelljs')

exercise.requireSubmission = false

exercise.addVerifyProcessor(function (cb) {
  shell.exec('wsk action get hello-world-python', {silent: true}, (code, stdout, stderr) => {
    const exists = (code === 0)
    const uses_python = (stdout.match(/\"kind\": \"python:?[\d.]+?"/))

    const success = exists && !!uses_python
    if (success) {
      this.emit('pass', 'OpenWhisk Action hello-world-python exists')
    } else {
      this.emit('fail', 'OpenWhisk Action hello-world-python does not exist')
    }

    cb(null, success)
  })
})

exercise.addVerifyProcessor(function (cb) {
  shell.exec('wsk action invoke hello-world-python -b -r', {silent: true}, (code, stdout, stderr) => {
    const success_code = (code === 0)
    const found_message = (stdout.match('"message": "Hello World"'))

    const success = success_code && !!found_message
    if (success) {
      this.emit('pass', 'OpenWhisk Action hello-world-python returns correct message')
    } else {
      this.emit('fail', 'OpenWhisk Action hello-world-python does not return correct message')
    }

    cb(null, success)
  })
})

exercise.addVerifyProcessor(function (cb) {
  shell.exec('wsk action get london-location-python', {silent: true}, (code, stdout, stderr) => {
    const exists = (code === 0)
    const uses_python = (stdout.match(/\"kind\": \"python:?[\d.]+?"/))

    const success = exists && !!uses_python
    if (success) {
      this.emit('pass', 'OpenWhisk Action london-location-python exists')
    } else {
      this.emit('fail', 'OpenWhisk Action london-location-python does not exist')
    }

    cb(null, success)
  })
})

exercise.addVerifyProcessor(function (cb) {
  shell.exec('wsk action invoke london-location-python -b -r', {silent: true}, (code, stdout, stderr) => {
    const success_code = (code === 0)
    const lat = (stdout.match('"lat": 51.5073509'))
    const lng = (stdout.match('"lng": -0.1277583'))

    const success = success_code && !!lat && !!lng
    if (success) {
      this.emit('pass', 'OpenWhisk Action london-location-python returns correct message')
    } else {
      this.emit('fail', 'OpenWhisk Action london-location-python does not return correct message')
    }

    cb(null, success)
  })
})

module.exports = exercise
