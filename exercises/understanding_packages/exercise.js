const exercise = require('workshopper-exercise')()
const shell = require('shelljs')

exercise.requireSubmission = false

exercise.addVerifyProcessor(function (cb) {
  shell.exec('wsk package get custom-package', {silent: true}, (code, stdout, stderr) => {
    let success = (code === 0)

    if (success) {
      this.emit('pass', 'OpenWhisk Package custom-package exists')
      const package = JSON.parse(stdout.match(/{[^]*$/)[0])
      if (package.parameters.length === 1 &&
          package.parameters[0].key === 'name' &&
          package.parameters[0].value === 'Donald') {
        this.emit('pass', 'OpenWhisk Package custom-package has correct default parameters')
        if (package.publish) {
          this.emit('pass', 'OpenWhisk Package custom-package has been published')
        } else {
          this.emit('fail', 'OpenWhisk Package custom-package has not been published')
          success = false
        }
      } else {
        this.emit('fail', 'OpenWhisk Package custom-package does not have correct default parameters')
        success = false
      }
    } else {
      this.emit('fail', 'OpenWhisk Package custom-package does not exist')
    }

    cb(null, success)
  })
})

exercise.addVerifyProcessor(function (cb) {
  shell.exec('wsk action get custom-package/greeting', {silent: true}, (code, stdout, stderr) => {
    const success = (code === 0)

    if (success) {
      this.emit('pass', 'OpenWhisk Action custom-package/greeting exists')
    } else {
      this.emit('fail', 'OpenWhisk Action custom-package/greeting does not exist')
    }

    cb(null, success)
  })
})

exercise.addVerifyProcessor(function (cb) {
  shell.exec('wsk action invoke custom-package/greeting -b -r', {silent: true}, (code, stdout, stderr) => {
    const success_code = (code === 0)
    const found_message = (stdout.match('"message": "Hello Donald"'))

    const success = success_code && !!found_message
    if (success) {
      this.emit('pass', 'OpenWhisk Action custom-package/greeting returns correct message')
    } else {
      this.emit('fail', 'OpenWhisk Action custom-package/greeting does not return correct message')
    }

    cb(null, success)
  })
})

module.exports = exercise
