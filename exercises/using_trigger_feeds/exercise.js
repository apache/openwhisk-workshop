const exercise = require('workshopper-exercise')()
const shell = require('shelljs')

exercise.requireSubmission = false

exercise.addVerifyProcessor(function (cb) {
  shell.exec('wsk trigger get alarm-trigger', {silent: true}, (code, stdout, stderr) => {
    let pass = false
    const exists = (code === 0)

    if (exists) {
      this.emit('pass', 'OpenWhisk Trigger alarm-trigger exists')
      const trigger = JSON.parse(stdout.match(/{[^]*$/)[0])
      if (trigger.annotations.length === 1) {
        if (trigger.annotations[0].key === 'feed' &&
            trigger.annotations[0].value === '/whisk.system/alarms/alarm') {
          this.emit('pass', 'OpenWhisk Trigger alarm-trigger feed correct')
          pass = true
        } else {
          this.emit('fail', 'OpenWhisk Trigger alarm-trigger feed incorrect')
        }
      } else {
        this.emit('fail', 'OpenWhisk Trigger alarm-trigger missing feed annotations')
      }
    } else {
      this.emit('fail', 'OpenWhisk Trigger alarm-trigger does not exist')
    }

    cb(null, pass)
  })
})

exercise.addVerifyProcessor(function (cb) {
  shell.exec('wsk activation list', {silent: true}, (code, stdout, stderr) => {
    const match = stdout.match(/(\w+).*alarm-trigger/)
    if (match) {
      this.emit('pass', 'OpenWhisk Trigger alarm-trigger was the fired.')
      const id = match[1]
      shell.exec(`wsk activation get ${id}`, {silent: true}, (code, stdout, stderr) => {
        let pass = false
        const trigger = JSON.parse(stdout.match(/{[^]*$/)[0])
        if (trigger.response.result &&
            trigger.response.result.message === 'Alarm fired!') {
          this.emit('pass', 'OpenWhisk Trigger activation used correct parameters')
          pass = true
        } else {
          this.emit('fail', 'OpenWhisk Trigger activation missing correct parameters')
        }
        cb(null, pass)
      })
    } else {
      this.emit('fail', 'OpenWhisk Trigger alarm-trigger was not the previous activation')
      cb(null, false)
    }
  })
})

module.exports = exercise
