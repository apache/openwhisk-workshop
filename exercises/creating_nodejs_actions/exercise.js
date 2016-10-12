const exercise = require('workshopper-exercise')()
const shell = require('shelljs')

exercise.requireSubmission = false

exercise.addVerifyProcessor(function (cb) {
  shell.exec('wsk action get hello-world-nodejs', {silent: true}, (code, stdout, stderr) => {
    const exists = (code === 0)
    const uses_nodejs = (stdout.match('"kind": "nodejs'))

    const success = exists && !!uses_nodejs
    if (success) {
      this.emit('pass', 'OpenWhisk Action hello-world-nodejs exists')
    } else {
      this.emit('fail', 'OpenWhisk Action hello-world-nodejs does not exist')
    }

    cb(null, success)
  })
})

exercise.addVerifyProcessor(function (cb) {
  shell.exec('wsk action invoke hello-world-nodejs -b -r', {silent: true}, (code, stdout, stderr) => {
    const success_code = (code === 0)
    const found_message = (stdout.match('"message": "Hello World"'))

    const success = success_code && !!found_message
    if (success) {
      this.emit('pass', 'OpenWhisk Action hello-world-nodejs returns correct message')
    } else {
      this.emit('fail', 'OpenWhisk Action hello-world-nodejs does not return correct message')
    }

    cb(null, success)
  })
})

exercise.addVerifyProcessor(function (cb) {
  shell.exec('wsk action get hello-world-nodejs-delay', {silent: true}, (code, stdout, stderr) => {
    const exists = (code === 0)
    const uses_nodejs = (stdout.match('"kind": "nodejs'))

    const success = exists && !!uses_nodejs
    if (success) {
      this.emit('pass', 'OpenWhisk Action hello-world-nodejs-delay exists')
    } else {
      this.emit('fail', 'OpenWhisk Action hello-world-nodejs-delay does not exist')
    }

    cb(null, success)
  })
})

exercise.addVerifyProcessor(function (cb) {
  shell.exec('wsk action invoke hello-world-nodejs-delay -b', {silent: true}, (code, stdout, stderr) => {
    const success_code = (code === 0)
    const found_message = (stdout.match('"message": "Hello World"'))

    const success = success_code && !!found_message
    if (success) {
      const start_time = parseInt(stdout.match(/start": (\d+)/)[1], 10)
      const end_time = parseInt(stdout.match(/end": (\d+)/)[1], 10)
      if ((end_time - start_time) < 1000) {
        this.emit('fail', 'OpenWhisk Action hello-world-nodejs-delay returned response within 1000ms.')
      } else {
        this.emit('pass', 'OpenWhisk Action hello-world-nodejs-delay returns correct message after delay')
      }
    } else {
      this.emit('fail', 'OpenWhisk Action hello-world-nodejs-delay does not return correct message')
    }

    cb(null, success)
  })
})

exercise.addVerifyProcessor(function (cb) {
  shell.exec('wsk action get london-location-nodejs', {silent: true}, (code, stdout, stderr) => {
    const exists = (code === 0)
    const uses_nodejs = (stdout.match('"kind": "nodejs'))

    const success = exists && !!uses_nodejs
    if (success) {
      this.emit('pass', 'OpenWhisk Action london-location-nodejs exists')
    } else {
      this.emit('fail', 'OpenWhisk Action london-location-nodejs does not exist')
    }

    cb(null, success)
  })
})

exercise.addVerifyProcessor(function (cb) {
  shell.exec('wsk action invoke london-location-nodejs -b -r', {silent: true}, (code, stdout, stderr) => {
    const success_code = (code === 0)
    const lat = (stdout.match('"lat": 51.5073509'))
    const lng = (stdout.match('"lng": -0.1277583'))

    const success = success_code && !!lat && !!lng
    if (success) {
      this.emit('pass', 'OpenWhisk Action london-location-nodejs returns correct message')
    } else {
      this.emit('fail', 'OpenWhisk Action london-location-nodejs does not return correct message')
    }

    cb(null, success)
  })
})

module.exports = exercise
