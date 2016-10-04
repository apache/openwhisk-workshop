const exercise = require('workshopper-exercise')()
const shell = require('shelljs')

exercise.requireSubmission = false

exercise.addVerifyProcessor(function (cb) {
  shell.exec('wsk action get greeting-with-parameter', {silent: true}, (code, stdout, stderr) => {
    const exists = (code === 0)

    if (exists) {
      this.emit('pass', 'OpenWhisk Action greeting-with-parameter exists')
    } else {
      this.emit('fail', 'OpenWhisk Action greeting-with-parameter does not exist')
    }

    cb(null, exists)
  })
})

exercise.addVerifyProcessor(function (cb) {
  shell.exec('wsk action invoke greeting-with-parameter -b -r', {silent: true}, (code, stdout, stderr) => {
    const success_code = (code === 0)
    const found_message = (stdout.match('"message": "Hello Bob"'))

    const success = success_code && !!found_message
    if (success) {
      this.emit('pass', 'OpenWhisk Action greeting-with-parameter returns default parameter')
    } else {
      this.emit('fail', 'OpenWhisk Action greeting-with-parameter does not return default parameter')
    }

    cb(null, success)
  })
})

exercise.addVerifyProcessor(function (cb) {
  shell.exec('wsk action invoke greeting-with-parameter -b -r -p name James', {silent: true}, (code, stdout, stderr) => {
    const success_code = (code === 0)
    const found_message = (stdout.match('"message": "Hello James"'))

    const success = success_code && !!found_message
    if (success) {
      this.emit('pass', 'OpenWhisk Action greeting-with-parameter returns custom parameter')
    } else {
      this.emit('fail', 'OpenWhisk Action greeting-with-parameter does not return custom parameter')
    }

    cb(null, success)
  })
})

module.exports = exercise
