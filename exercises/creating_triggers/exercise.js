const exercise = require('workshopper-exercise')()
const shell = require('shelljs')

exercise.requireSubmission = false

exercise.addVerifyProcessor(function (cb) {
  shell.exec('wsk trigger get sample-trigger', {silent: true}, (code, stdout, stderr) => {
    let pass = false
    const exists = (code === 0)

    if (exists) {
      this.emit('pass', 'OpenWhisk Trigger sample-trigger exists')
      const trigger = JSON.parse(stdout.match(/{[^]*$/)[0])
      if (trigger.parameters.length === 1) {
        this.emit('pass', 'OpenWhisk Trigger has a single parameter')
        if (trigger.parameters[0].key === 'name' &&
            trigger.parameters[0].value === 'James') {
          this.emit('pass', 'OpenWhisk Trigger sample-trigger default parameter correct')
          pass = true
        } else {
          this.emit('fail', 'OpenWhisk Trigger sample-trigger default parameter incorrect')
        }
      } else {
        this.emit('fail', 'OpenWhisk Trigger does not have a single parameter')
      }
    } else {
      this.emit('fail', 'OpenWhisk Trigger sample-trigger exists')
    }

    cb(null, pass)
  })
})

exercise.addVerifyProcessor(function (cb) {
  shell.exec('wsk activation list -l 1', {silent: true}, (code, stdout, stderr) => {
    const match = stdout.match(/(\w+).*sample-trigger/)
    if (match) {
      this.emit('pass', 'OpenWhisk Trigger sample-trigger was the previous activation')
      const id = match[1]
      shell.exec(`wsk activation get ${id}`, {silent: true}, (code, stdout, stderr) => {
        let pass = false
        const trigger = JSON.parse(stdout.match(/{[^]*$/)[0])
        if (trigger.response.result &&
            trigger.response.result.location === 'New York' &&
            trigger.response.result.name === 'Donald') {
          this.emit('pass', 'OpenWhisk Trigger activation used correct parameters')
          pass = true
        } else {
          this.emit('fail', 'OpenWhisk Trigger activation missing correct parameters')
        }
        cb(null, pass)
      })
    } else {
      this.emit('fail', 'OpenWhisk Trigger sample-trigger was not the previous activation')
      cb(null, false)
    }
  })
})

module.exports = exercise
