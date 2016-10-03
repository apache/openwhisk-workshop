const exercise = require('workshopper-exercise')()
const shell = require('shelljs')

exercise.requireSubmission = false

exercise.addVerifyProcessor(function (cb) {
  const command = shell.which('wsk')
  if (!command) {
    this.emit('fail', 'Missing OpenWhisk CLI from user path.')
  } else {
    this.emit('pass', 'Found OpenWhisk CLI in user path.')
  }

  cb(null, !!command)
})

exercise.addVerifyProcessor(function (cb) {
  shell.exec('wsk property get --apihost', {silent: true}, (code, stdout, stderr) => {
    const match = stdout.match(/openwhisk.ng.bluemix.net/)
    if (match) {
      this.emit('pass', 'OpenWhisk endpoint set correctly')
    } else {
      this.emit('fail', 'OpenWhisk endpoint set incorrectly')
    }
    cb(null, !!match)
  })
})

exercise.addVerifyProcessor(function (cb) {
  shell.exec('wsk property get --auth', {silent: true}, (code, stdout, stderr) => {
    const match = stdout.match(/:/)
    if (match) {
      this.emit('pass', 'OpenWhisk authentication set correctly')
    } else {
      this.emit('fail', 'OpenWhisk authentication set incorrectly')
    }
    cb(null, !!match)
  })
})

exercise.addVerifyProcessor(function (cb) {
  shell.exec('wsk property get --namespace', {silent: true}, (code, stdout, stderr) => {
    const match = stdout.match(/@/)
    if (match) {
      this.emit('pass', 'OpenWhisk namespace set correctly')
    } else {
      this.emit('fail', 'OpenWhisk namespace set incorrectly')
    }
    cb(null, !!match)
  })
})

exercise.addVerifyProcessor(function (cb) {
  shell.exec('wsk action list', {silent: true}, (code, stdout, stderr) => {
    const passed = (code === 0)
    if (passed) {
      this.emit('pass', 'Able to use CLI to interact with platform.')
    } else {
      this.emit('fail', 'Failed to use CLI to interact with the platform.')
    }
    cb(null, passed)
  })
})

module.exports = exercise
